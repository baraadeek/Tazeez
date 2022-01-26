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
        #endregion private variable

        public UsersController(IUserManager userManager, IConfigurationSettings configuration)
            : base(configuration)
        {
            _userManager = userManager;
        }

        [Route("api/v{version:apiVersion}/user/{id}/name")]
        [HttpGet]
        [MapToApiVersion("1")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetName(int id)
        {
            var result = _userManager.GetName(id);
            return Ok(result);
        }

        [Route("api/v{version:apiVersion}/doctor")]
        [HttpGet]
        [MapToApiVersion("1")]
        public IActionResult GetDoctors(int page = 1, int pageSize = 10)
        {
            var result = _userManager.GetDoctors(page, pageSize);
            return Ok(result);
        }

        [Route("api/v{version:apiVersion}/users")]
        [HttpGet]
        [MapToApiVersion("1")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult SearchUsers(int page = 1, int pageSize = 10, string searchText = "")
        {
            var result = _userManager.SearchUsers(LoggedInUser, page, pageSize, searchText);
            return Ok(result);
        }

        [Route("api/v{version:apiVersion}/doctor")]
        [HttpPut]
        [MapToApiVersion("1")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult PutDoctor(AddDoctorRequest addDoctorRequest)
        {
            var result = _userManager.PutDoctor(LoggedInUser, addDoctorRequest);
            return Ok(result);
        }

        [Route("api/v{version:apiVersion}/doctor/{id}")]
        [HttpGet]
        [MapToApiVersion("1")]
        public IActionResult GetDoctor(int id)
        {
            var result = _userManager.GetDoctor(LoggedInUser, id);
            return Ok(result);
        }

        [Route("api/v{version:apiVersion}/doctor/{id}")]
        [HttpDelete]
        [MapToApiVersion("1")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult ArchivedDoctor(int id)
        {
            _userManager.ArchivedDoctor(LoggedInUser, id);
            return Ok();
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

        [Route("api/v{version:apiVersion}/user/test")]
        [HttpGet]
        [MapToApiVersion("1")]
        public IActionResult Test()
        {
            var result = _userManager.Test();
            return Ok(result);
        }
    }
}
