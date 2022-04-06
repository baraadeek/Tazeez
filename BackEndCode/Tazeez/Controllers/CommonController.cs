using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tazeez.Core.Managers.Common;
using Tazeez.Infrastructure;
using Tazeez.ModelViews.ModelViews;

namespace Tazeez.Controllers
{
    [ApiVersion("1")]
    [ApiController]
    public class CommonController : ApiBaseController
    {
        #region private variable
        private ICommonManager _commonManager { get; set; }
        #endregion private variable

        public CommonController(ICommonManager commonManager, IConfigurationSettings configuration)
            : base(configuration)
        {
            _commonManager = commonManager;
        }

        [Route("api/v{version:apiVersion}/common/contactwithus")]
        [HttpPost]
        [MapToApiVersion("1")]
        public IActionResult ContactWithUS(ContactUsRequestModel contactRequestModel)
        {
            _commonManager.AddContactWithUS(contactRequestModel);
            return Ok();
        }

        [Route("api/v{version:apiVersion}/common/contactwithus")]
        [HttpGet]
        [MapToApiVersion("1")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetContactWithUS(int page = 0, int PageSize = 10)
        {
            var res = _commonManager.GetContactWithUS(LoggedInUser, page, PageSize);
            return Ok(res);
        }

        [Route("api/v{version:apiVersion}/common/contactwithus/{id}")]
        [HttpDelete]
        [MapToApiVersion("1")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult ArchiveContactWithUS(int id)
        {
            _commonManager.ArchiveContactWithUS(LoggedInUser, id);
            return Ok();
        }
    }
}
