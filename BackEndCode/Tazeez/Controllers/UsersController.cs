using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tazeez.Core.Managers.User;
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

        [Route("api/v{version:apiVersion}/user/name")]
        [HttpGet]
        [MapToApiVersion("1")]
        public IActionResult GetName()
        {
            var result = _userManager.GetName();
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
