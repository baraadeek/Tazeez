using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Tazeez.Infrastructure;
using Tazeez.Models.Models;
using Tazeez.ModelViews;
using Tazeez.ModelViews.Request;
using Tazeez.ModelViews.Response;

namespace Tazeez.Core.Managers.User
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

        public string GetName()
        {
            var user = _context.Users.FirstOrDefault();
            return "hi";
        }
        
        public UserModel GetUser(int id)
        {
            var user = _context.Users.FirstOrDefault(a => a.Id == id) 
                        ?? throw new Exception("Email dose not exist");

            return _mapper.Map<UserModel>(user);
        }
        
        public UserModel SignUp(SignUpRequest signUpRequest)
        {
            var user = _context.Users.FirstOrDefault(a => a.Email.Equals(signUpRequest.Email));

            if (user != null)
            {
                throw new Exception("Email alraedy exist");
            }

            user = _context.Users.Add(new Models.DB.User { 
                FirstName = signUpRequest.FirstName,
                LastName = signUpRequest.LastName,
                Email = signUpRequest.Email,
                Password = HashPassword(signUpRequest.Password)
            }).Entity;

            _context.SaveChanges();
            return _mapper.Map<UserModel>(user);
        }
        
        public LoginResponse Login(LoginRequest loginRequest)
        {
            var user = _context.Users.FirstOrDefault(a => a.Email.Equals(loginRequest.Email));

            if (user == null)
            {
                throw new Exception("User not exists");
            }

            if (VerifyHashPassword(loginRequest.Password, user.Password))
            {
                var tokenString = GenerateJSONWebToken(user);
                var res = _mapper.Map<LoginResponse>(user);

                res.Token = $"Bearer {tokenString}";
                return res;
            }

            throw new Exception("Invalid email or password");
        }

        #region private Method

        private string HashPassword(string password)
        {
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(password);
            return passwordHash;
        }

        private bool VerifyHashPassword(string password, string passwordHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, passwordHash);
        }

        private string GenerateJSONWebToken(Models.DB.User userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configurationSettings.JwtKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.FirstName),
                new Claim(JwtRegisteredClaimNames.Email, userInfo.Email),
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
