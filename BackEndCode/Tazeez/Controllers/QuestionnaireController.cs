using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tazeez.Core.Managers.Questionnaires;
using Tazeez.Infrastructure;
using Tazeez.Models.Requests;
using Tazeez.ModelViews.ModelViews;
using Tazeez.ModelViews.Request;

namespace Tazeez.Controllers
{
    [ApiVersion("1")]
    [ApiController]
    public class QuestionnaireController : ApiBaseController
    {
        #region private variable
        private IQuestionnaireManager _questionnaireManager { get; set; }
        #endregion private variable

        public QuestionnaireController(IQuestionnaireManager questionnaireManager, IConfigurationSettings configuration)
            : base(configuration)
        {
            _questionnaireManager = questionnaireManager;
        }

        [Route("api/v{version:apiVersion}/questionnaire")]
        [HttpPut]
        [MapToApiVersion("1")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult CraeteQuestionnaire(CreateQuestionnaireRequest createQuestionnaire)
        {
            _questionnaireManager.CraeteQuestionnaire(LoggedInUser, createQuestionnaire);
            return Ok();
        }
        
        [Route("api/v{version:apiVersion}/questionnaire")]
        [HttpGet]
        [MapToApiVersion("1")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetQuestionnaires(int page = 1,
                                                int pageSize = 10,
                                                int status = 0,
                                                string sortColumn = "",
                                                string sortDirection = "")
        {
            var res = _questionnaireManager.GetQuestionnaires(LoggedInUser, page, pageSize, status, sortColumn, sortDirection);
            return Ok(res);
        }
        
        [Route("api/v{version:apiVersion}/questionnaire/{id}/Questions")]
        [HttpPost]
        [MapToApiVersion("1")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetQuestionnaireQuestions(int id,
                                                        int page = 1,
                                                        int pageSize = 10,
                                                        int questionId = 0,
                                                        SearchTextRequest searchText = null)
        {
            var res = _questionnaireManager.GetQuestionnaireQuestions(LoggedInUser, id, page, pageSize, questionId, searchText);
            return Ok(res);
        }
        
        [Route("api/v{version:apiVersion}/questionnairetemplate")]
        [HttpPut]
        [MapToApiVersion("1")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult PutQuestionnaireTemplate(QuestionnaireTemplateModel questionnaireTemplateModel)
        {
            var result = _questionnaireManager.PutQuestionnaireTemplate(LoggedInUser, questionnaireTemplateModel);
            return Ok(result);
        }
        
        [Route("api/v{version:apiVersion}/questionnairetemplate/{id}")]
        [HttpPut]
        [MapToApiVersion("1")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult PutQuestionnaireTemplateQuestion(int id, QuestionnaireTemplateQuestionRequestModel questionnaireTemplateQuesionModel)
        {
            var result = _questionnaireManager.PutQuestionnaireTemplateQuestion(LoggedInUser, id, questionnaireTemplateQuesionModel);
            return Ok(result);
        }
        
        [Route("api/v{version:apiVersion}/questionnairetemplate/{id}")]
        [HttpGet]
        [MapToApiVersion("1")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult QetQuestionnaireTemplateQuestion(int id)
        {
            var result = _questionnaireManager.GetQuestionniareTemplateQuestions(LoggedInUser, id);
            return Ok(result);
        }
        
        [Route("api/v{version:apiVersion}/questionnairetemplate")]
        [HttpGet]
        [MapToApiVersion("1")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult QetQuestionnaireTemplate()
        {
            var result = _questionnaireManager.GetQuestionniareTemplate(LoggedInUser);
            return Ok(result);
        }
    }
}
