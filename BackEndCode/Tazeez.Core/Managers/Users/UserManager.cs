using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Tazeez.Common.Extensions;
using Tazeez.DB.Models.DB;
using Tazeez.Infrastructure;
using Tazeez.Models.Models;
using Tazeez.ModelViews;
using Tazeez.ModelViews.ModelViews;
using Tazeez.ModelViews.Request;
using Tazeez.ModelViews.Response;

namespace Tazeez.Core.Managers.Users
{
    public class UserManager : IUserManager
    {
        private readonly TazeezContext _context;
        private readonly IMapper _mapper;
        private readonly IConfigurationSettings _configurationSettings;

        public UserManager(TazeezContext context, 
                           IMapper mapper,
                           IConfigurationSettings configurationSettings)
        {
            _context = context;
            _mapper = mapper;
            _configurationSettings = configurationSettings;
        }

        public string GetName(int userId)
        {
            var user = _context.User
                               .FirstOrDefault(a => a.Id == userId);

            return $"{user.FirstName} {user.LastName}";
        }
        
        public UserModel GetUser(int id)
        {
            var user = _context.User
                               .Include(a => a.Doctor)
                               .FirstOrDefault(a => a.Id == id) 
                               ?? throw new ServiceValidationException("Email dose not exist");

            return _mapper.Map<UserModel>(user);
        }

        public UserModel Test()
        {
            var user = _context.Doctor.FirstOrDefault(a => a.Id == 0);
            return null;
        }

        public DoctorModel GetDoctor(UserModel currentUser, int doctorId)
        {
            Log.Information($"Inside GetDoctor for doctorId => {doctorId}");

            var doctor = _context.Doctor
                                 .Include(a => a.User)
                                 .FirstOrDefault(a => a.Id == doctorId)
                                 ?? throw new ServiceValidationException("Invalid doctor id received");

            Log.Information($"Finish GetDoctor for doctorId => {doctorId}");
            return _mapper.Map<DoctorModel>(doctor);
        }

        public PagedResult<SearchUserModel> SearchUsers(UserModel currentUser, int page = 1, int pageSize = 10, string searchText = "")
        {
            Log.Information($"Inside SearchUsers => page => {page}, pageSize => {pageSize}");

            if (!currentUser.IsAdmin)
            {
                throw new ServiceValidationException("You don't have permission to search on system users");
            }

            var users = _context.User
                                .Where(a => (string.IsNullOrWhiteSpace(searchText)
                                            || (a.Email.Contains(searchText, StringComparison.InvariantCultureIgnoreCase))
                                            || ((a.FirstName.Replace(" ", string.Empty) +
                                                a.LastName.Replace(" ", string.Empty)).Contains(searchText, StringComparison.InvariantCultureIgnoreCase))))
                                .GetPaged(page, pageSize);

            Log.Information($"Finish SearchUsers => page => {page}, pageSize => {pageSize}");
            return _mapper.Map<PagedResult<SearchUserModel>>(users);
        }

        public PagedResult<DoctorModel> GetDoctors(int page = 1, int pageSize = 10)
        {
            Log.Information($"Inside GetDoctor => page => {page}, pageSize => {pageSize}");
            
            var doctors = _context.Doctor
                                  .Include(a => a.User)
                                  .GetPaged(page, pageSize);

            Log.Information($"Finish GetDoctor => page => {page}, pageSize => {pageSize}");
            
            return _mapper.Map<PagedResult<DoctorModel>>(doctors);
        }

        public DoctorModel PutDoctor(UserModel currentUser, AddDoctorRequest addDoctorRequest)
        {
            Log.Information($"Inside PutDoctor for userId => {addDoctorRequest.UserId}");

            if (!currentUser.IsAdmin)
            {
                throw new ServiceValidationException("You don't have permission to add a doctor");
            }

            var user = _context.User
                               .FirstOrDefault(a => a.Id == addDoctorRequest.UserId)
                               ?? throw new ServiceValidationException("Please select valid user to assign it as a doctor");

            Doctor doctor = null;
            if (addDoctorRequest.Id > 0)
            {
                doctor = _context.Doctor
                                 .FirstOrDefault(a => a.Id == addDoctorRequest.Id 
                                                      && a.UserId == addDoctorRequest.UserId)
                                 ?? throw new ServiceValidationException("Invalid doctor id received");

                doctor.Specialist = addDoctorRequest.Specialist;
                doctor.Description = addDoctorRequest.Description;
            }
            else
            {
                doctor = _context.Doctor.Add(new Doctor
                {
                    Specialist = addDoctorRequest.Specialist,
                    Description = addDoctorRequest.Description,
                    UserId = addDoctorRequest.UserId
                }).Entity;
            }

            _context.SaveChanges();
            Log.Information($"Finish PutDoctor for userId => {addDoctorRequest.UserId}");
            return _mapper.Map<DoctorModel>(doctor);
        }
        
        public void ArchivedDoctor(UserModel currentUser, int doctorId)
        {
            Log.Information($"Inside ArchivedDoctor for doctorId => {doctorId}");

            if (!currentUser.IsAdmin)
            {
                throw new ServiceValidationException("You don't have permission to add a doctor");
            }

            var doctor = _context.Doctor
                                 .Include(a => a.User)
                                 .FirstOrDefault(a => a.Id == doctorId)
                                 ?? throw new ServiceValidationException("Invalid doctor id received");

            doctor.Archived = true;
            _context.SaveChanges();
            Log.Information($"Finish ArchivedDoctor for doctorId => {doctorId}");
        }

        public UserModel SignUp(SignUpRequest signUpRequest)
        {
            var user = _context.User.FirstOrDefault(a => a.Email.Equals(signUpRequest.Email, StringComparison.InvariantCultureIgnoreCase));

            if (user != null)
            {
                throw new ServiceValidationException("Email alraedy exist");
            }

            user = _context.User.Add(new User
            {
                FirstName = signUpRequest.FirstName,
                LastName = signUpRequest.LastName,
                Email = signUpRequest.Email.ToLower(),
                Password = HashPassword(signUpRequest.Password)
            }).Entity;

            _context.SaveChanges();
            return _mapper.Map<UserModel>(user);
        }
        
        public LoginResponse Login(LoginRequest loginRequest)
        {
            var user = _context.User.FirstOrDefault(a => a.Email.Equals(loginRequest.Email));

            if (user == null)
            {
                throw new ServiceValidationException("User not exists");
            }

            if (VerifyHashPassword(loginRequest.Password, user.Password))
            {
                var tokenString = GenerateJSONWebToken(user);
                var res = _mapper.Map<LoginResponse>(user);

                res.Token = $"Bearer {tokenString}";
                return res;
            }

            throw new ServiceValidationException("Invalid email or password");
        }

        public UserModel UpdateProfile(UserModel currentUser, UpdateProfileRequestModel request)
        {
            var url = "";

            if (!string.IsNullOrWhiteSpace(request.Image))
            {
                url = SaveImage(request.Image);
            }

            var user = _context.User
                               .FirstOrDefault(a => a.Id == currentUser.Id)
                               ?? throw new ServiceValidationException("User not found");

            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.City = request.City;
            user.PhoneNumber = request.PhoneNumber;
            user.Image = @$"{_configurationSettings.Domain}/api/v1/user/fileretrive/profilepic?filename={url}";
            _context.SaveChanges();
            return _mapper.Map<UserModel>(user);
        }

        #region private Method

        private string SaveImage(string base64img)
        {
            try
            {
                var baseFolder = "profileimages";
                var folderPath = Path.Combine(Directory.GetCurrentDirectory(), baseFolder);
                
                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                var base64Array = base64img.Split(";base64,");
                if (base64Array.Length < 1)
                {
                    return "";
                }

                base64img = base64Array[1];
                var fileName = $"{Guid.NewGuid()}{"Logo.png"}".Replace("-", "", StringComparison.InvariantCultureIgnoreCase);
                if (!string.IsNullOrWhiteSpace(folderPath))
                {
                    var url = $@"{baseFolder}\{fileName}";
                    fileName = @$"{folderPath}\{fileName}";
                    File.WriteAllBytes(fileName, Convert.FromBase64String(base64img));
                    return url;
                }

                return "";
            }
            catch (Exception ex)
            {
                throw new ServiceValidationException(ex.Message);
            }
        }

        private string HashPassword(string password)
        {
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(password);
            return passwordHash;
        }

        private bool VerifyHashPassword(string password, string passwordHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, passwordHash);
        }

        private string GenerateJSONWebToken(User userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configurationSettings.JwtKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.FirstName),
                new Claim(JwtRegisteredClaimNames.Email, userInfo.Email.ToLower()),
                new Claim("Id", userInfo.Id.ToString()),
                new Claim("DateOfJoing", userInfo.CreatedDate.ToString("yyyy-MM-dd")),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(_configurationSettings.Issuer,
              _configurationSettings.Issuer,
              claims,
              expires: DateTime.Now.AddDays(30),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        #endregion private Method
    }
}
