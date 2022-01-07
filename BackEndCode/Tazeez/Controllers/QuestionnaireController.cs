﻿using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tazeez.Core.Managers.Questionnaires;
using Tazeez.Core.Managers.Users;
using Tazeez.Infrastructure;
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
    }
}
