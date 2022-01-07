using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using Tazeez.Core.Managers.Users;
using Tazeez.Infrastructure;
using Tazeez.ModelViews.Request;

namespace Tazeez.Controllers
{
    [ApiVersion("1")]
    [ApiController]
    public class UsersController : ApiBaseController
    {
        #region private variable
        private IUserManager _userManager { get; set; }
        private IWebHostEnvironment _env { get; set; }
        #endregion private variable

        public UsersController(IUserManager userManager, IConfigurationSettings configuration, IWebHostEnvironment env) 
            : base(configuration)
        {
            _userManager = userManager;
            _env = env;
        }

        [Route("api/v{version:apiVersion}/user/{id}/name")]
        [HttpGet]
        [MapToApiVersion("1")]
        public IActionResult GetName(int id)
        {
            var result = _userManager.GetName(id);
            return Ok(result);
        }
        
        [Route("api/v{version:apiVersion}/user/signup")]
        [HttpPost]
        [MapToApiVersion("1")]
        public IActionResult Signup(SignUpRequest signUpRequest)
        {
            var result = _userManager.SignUp(signUpRequest);
            return Ok(result);
        }
        
        [Route("api/v{version:apiVersion}/user/login")]
        [HttpPost]
        [MapToApiVersion("1")]
        public IActionResult Login(LoginRequest loginRequest)
        {
            var result = _userManager.Login(loginRequest);
            return Ok(result);
        }
        
        [Route("api/v{version:apiVersion}/user/profile/me")]
        [HttpPut]
        [MapToApiVersion("1")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult UpdateProfile(UpdateProfileRequestModel updateProfileRequestModel)
        {
            var result = _userManager.UpdateProfile(LoggedInUser, updateProfileRequestModel);
            return Ok(result);
        }

        [Route("api/v{version:apiVersion}/user/fileretrive/profilepic")]
        [HttpGet]
        [MapToApiVersion("1")]
        public IActionResult Retrive(string filename)
        {
            var folderPath = Directory.GetCurrentDirectory();
            folderPath = $@"{folderPath}\{filename}";
            var byteArray = System.IO.File.ReadAllBytes(folderPath);
            return File(byteArray, "image/jpeg", filename);
        }

        [Route("api/v{version:apiVersion}/user/{id}")]
        [HttpGet]
        [MapToApiVersion("1")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetUser(int id)
        {
            var result = _userManager.GetUser(id);
            return Ok(result);
        }
    }
}
