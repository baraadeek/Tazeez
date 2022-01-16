using System.Collections.Generic;
using Tazeez.Common.Extensions;
using Tazeez.ModelViews;
using Tazeez.ModelViews.ModelViews;
using Tazeez.ModelViews.Request;
using Tazeez.ModelViews.Response;

namespace Tazeez.Core.Managers.Questionnaires
{
    public interface IQuestionnaireManager : IManager
    {
        public PagedResult<QuestionnaireResponse> GetQuestionnaires(UserModel currentUser,
                                                                    int page = 1,
                                                                    int pageSize = 10,
                                                                    int status = 0,
                                                                    string sortColumn = "",
                                                                    string sortDirection = "");

        QuestionnaireQuestionResponse GetQuestionnaireQuestions(UserModel currentUser, int id, int questionId);

        void CraeteQuestionnaire(UserModel currentUser, CreateQuestionnaireRequest createQuestionnaire);

        QuestionnaireTemplateModel PutQuestionnaireTemplate(UserModel currentUser, QuestionnaireTemplateModel questionnaireTemplateModel);

        QuestionnaireTemplateQuestionModel PutQuestionnaireTemplateQuestion(UserModel currentUser, int questionnaireTemplateId, QuestionnaireTemplateQuestionRequestModel questionnaireTemplateQuesionModel);

        List<QuestionnaireTemplateQuestionModel> GetQuestionniareTemplateQuestions(UserModel currentUser, int questionnaireTemplateId);

        List<QuestionnaireTemplateResponseModel> GetQuestionniareTemplate(UserModel currentUser);
    }
}
