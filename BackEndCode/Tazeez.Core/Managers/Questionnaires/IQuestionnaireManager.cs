using System.Collections.Generic;
using Tazeez.ModelViews;
using Tazeez.ModelViews.ModelViews;
using Tazeez.ModelViews.Request;
using Tazeez.ModelViews.Response;

namespace Tazeez.Core.Managers.Questionnaires
{
    public interface IQuestionnaireManager : IManager
    {
        QuestionnaireTemplateModel PutQuestionnaireTemplate(UserModel currentUser, QuestionnaireTemplateModel questionnaireTemplateModel);

        QuestionnaireTemplateQuestionModel PutQuestionnaireTemplateQuestion(UserModel currentUser, int questionnaireTemplateId, QuestionnaireTemplateQuestionRequestModel questionnaireTemplateQuesionModel);

        List<QuestionnaireTemplateQuestionModel> GetQuestionniareTemplateQuestions(UserModel currentUser, int questionnaireTemplateId);

        List<QuestionnaireTemplateResponseModel> GetQuestionniareTemplate(UserModel currentUser);
    }
}
