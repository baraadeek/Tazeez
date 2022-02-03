using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Tazeez.Common.Extensions;
using Tazeez.Core.Managers.Questionnaires;
using Tazeez.Enums;
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


        [Route("api/v{version:apiVersion}/questionnairetemplategroup/{id}/groupscore")]
        [HttpGet]
        [MapToApiVersion("1")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetTemplateGroupScore(int id)
        {
            var res = _questionnaireManager.GetTemplateGroupScore(LoggedInUser, id);
            return Ok(res);
        }
        
        [Route("api/v{version:apiVersion}/questionnairetemplategroup/groupscore")]
        [HttpPut]
        [MapToApiVersion("1")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult PutTemplateGroupScore(TemplateGroupScoreModel request)
        {
            var res = _questionnaireManager.PutTemplateGroupScore(LoggedInUser, request);
            return Ok(res);
        }

        [Route("api/v{version:apiVersion}/questionnairegrouptemplatequestion")]
        [HttpPut]
        [MapToApiVersion("1")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult PutQuestionnaireGroupTemplateQuestion(QuestionnaireGroupTemplateQuestionRequest request)
        {
            var result = _questionnaireManager.PutQuestionnaireGroupTemplateQuestion(LoggedInUser, request);
            return Ok(result);
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
        public IActionResult PutQuestionnaireTemplate(QuestionnaireTemplateRequest request)
        {
            var result = _questionnaireManager.PutQuestionnaireTemplate(LoggedInUser, request);
            return Ok(result);
        }
        
        [Route("api/v{version:apiVersion}/questionnairetemplate/{id}")]
        [HttpDelete]
        [MapToApiVersion("1")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult ArchiveQuestionnaireTemplate(int id)
        {
            _questionnaireManager.ArchiveQuestionnaireTemplate(LoggedInUser, id);
            return Ok();
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
        public IActionResult QetQuestionnaireTemplate(string name = "")
        {
            var result = _questionnaireManager.GetQuestionniareTemplate(LoggedInUser, name);
            return Ok(result);
        }

        [Route("api/v{version:apiVersion}/questionnaire/{id}/question/{questionId}/multiChoice")]
        [HttpPut]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> AnswerQuestionChoiceAsync(int id, int questionId, QuestionnaireQuestionAnswerChoiceRequest assessmentQuestionAnswerChoice)
        {
            var res = await _questionnaireManager.AnswerQuestionAsyncV1(LoggedInUser, id, questionId, assessmentQuestionAnswerChoice, AnswerTypeEnum.AnswerQuestion).AnyContext();
            return Ok(res);
        }

        [Route("api/v{version:apiVersion}/questionnaire/{id}/question/{questionId}/textAnswer")]
        [HttpPut]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> AnswerQuestionTextAsync(int id, int questionId, QuestionnaireQuestionAnswerTextRequest assessmetnQuestionAnswerText)
        {
            var res = await _questionnaireManager.AnswerQuestionAsyncV1(LoggedInUser, id, questionId, assessmetnQuestionAnswerText, AnswerTypeEnum.AnswerQuestion).AnyContext();
            return Ok(res);
        }

        [Route("api/v{version:apiVersion}/questionnaire/{id}/question/{questionId}/additionalText")]
        [HttpPut]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> AnswerQuestionAdditionalInfoAsync(int id, int questionId, QuestionnaireQuestionAnswerTextRequest assessmetnQuestionAnswerText)
        {
            var res = await _questionnaireManager.AnswerQuestionAsyncV1(LoggedInUser, id, questionId, assessmetnQuestionAnswerText, AnswerTypeEnum.AnswerQuestionAdditionalInfo).AnyContext();
            return Ok(res);
        }

        [Route("api/v{version:apiVersion}/questionnaire/{id}/question/{questionId}/attachment")]
        [HttpPut]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> AnswerQuestionAttachmentAsync(int id, int questionId, QuestionAttachmentAnswer assessmentQuestionAttachmentAnswer)
        {
            var res = await _questionnaireManager.AnswerQuestionAsyncV1(LoggedInUser, id, questionId, assessmentQuestionAttachmentAnswer, AnswerTypeEnum.AddQuestionAttachment).AnyContext();
            return Ok(res);
        }

        [Route("api/v{version:apiVersion}/questionnaire/{id}/status/{status}")]
        [HttpPut]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult UpdateAssessmentStatus(int id, int status)
        {
            _questionnaireManager.UpdateAssessmentStatus(LoggedInUser, id, status);
            return Ok();
        }

    }
}
