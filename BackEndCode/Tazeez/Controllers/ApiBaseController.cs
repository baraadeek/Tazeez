using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using System.Linq;
using System.Security.Claims;
using Newtonsoft.Json;
using Serilog;
using Tazeez.Infrastructure;
using Tazeez.ModelViews;
using Tazeez.Core.Managers.Common;
using Tazeez.Common.Extensions;

namespace Tazeez.Controllers
{
    public class ApiBaseController : Controller
    {
        protected readonly IConfigurationSettings _configuration;
        private UserModel _loggedInUser;

        protected UserModel LoggedInUser
        {
            get
            {
                if (_loggedInUser != null)
                {
                    return _loggedInUser;
                }

                Request.Headers.TryGetValue("Authorization", out StringValues Token);

                if (string.IsNullOrWhiteSpace(Token))
                {
                    _loggedInUser = null;
                    return _loggedInUser;
                }

                var ClaimId = User.Claims.FirstOrDefault(c => c.Type == "Id");

                if (ClaimId == null || !int.TryParse(ClaimId.Value, out int id))
                {
                    throw new ServiceValidationException(401, "Invalid or expired Token");
                }

                var commonManager = HttpContext.RequestServices.GetService(typeof(ICommonManager)) as ICommonManager;

                _loggedInUser = commonManager.GetUserRole(new UserModel { Id = id });

                return _loggedInUser;
            }
        }

        public ApiBaseController()
        {
        }

        public ApiBaseController(IConfigurationSettings configuration)
        {
            _configuration = configuration;
        }
    }
}