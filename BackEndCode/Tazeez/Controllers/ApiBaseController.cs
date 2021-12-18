using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using System.Linq;
using System.Security.Claims;
using Newtonsoft.Json;
using Serilog;
using Tazeez.Infrastructure;

namespace Tazeez.Controllers
{
    public class ApiBaseController : Controller
    {
        protected readonly IConfigurationSettings _configuration;

        public ApiBaseController()
        {
        }

        public ApiBaseController(IConfigurationSettings configuration)
        {
            _configuration = configuration;
        }
    }
}