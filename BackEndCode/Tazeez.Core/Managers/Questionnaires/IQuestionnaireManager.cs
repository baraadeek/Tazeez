using System.Collections.Generic;
using System.Threading.Tasks;
using Tazeez.Common.Extensions;
using Tazeez.Enums;
using Tazeez.Models.Requests;
using Tazeez.Models.Responses;
using Tazeez.ModelViews;
using Tazeez.ModelViews.ModelViews;
using Tazeez.ModelViews.Request;
using Tazeez.ModelViews.Response;

namespace Tazeez.Core.Managers.Questionnaires
{
    public interface IQuestionnaireManager : IManager
    {
        void UpdateAssessmentStatus(UserModel currentUser, int assessmentId, int status);

        Task<AnsweredQuestionResponseV1> AnswerQuestionAsyncV1(UserModel currentUser,
                                                               int assessmentId,
                                                               int questionId,
                                                               IQuestionAnswerRequest questionAnswerRequestBase,
                                                               AnswerTypeEnum answerType = AnswerTypeEnum.AnswerQuestion);

        public PagedResult<QuestionnaireResponse> GetQuestionnaires(UserModel currentUser,
                                                                    int page = 1,
                                                                    int pageSize = 10,
                                                                    int status = 0,
                                                                    string sortColumn = "",
                                                                    string sortDirection = "");

        QuestionnaireQuestionsResponseV1 GetQuestionnaireQuestions(UserModel currentUser,
                                                                   int questionnaireId,
                                                                   int page,
                                                                   int pageSize,
                                                                   int questionId = 0,
                                                                   SearchTextRequest searchText = null);
        void CraeteQuestionnaire(UserModel currentUser, CreateQuestionnaireRequest createQuestionnaire);

        QuestionnaireTemplateModel PutQuestionnaireTemplate(UserModel currentUser, QuestionnaireTemplateRequest request);

        void ArchiveQuestionnaireTemplate(UserModel currentUser, int id);

        QuestionnaireTemplateQuestionModel PutQuestionnaireTemplateQuestion(UserModel currentUser,
                                                                            int questionnaireTemplateId,
                                                                            QuestionnaireTemplateQuestionRequestModel questionnaireTemplateQuesionModel);

        Dictionary<string, List<QuestionnaireTemplateQuestionModel>> GetQuestionniareTemplateQuestions(UserModel currentUser, int questionnaireTemplateId);

        List<QuestionnaireTemplateResponseModel> GetQuestionniareTemplate(UserModel currentUser, string name);

        QuestionnaireGroupTemplateQuestionResponse PutQuestionnaireGroupTemplateQuestion(UserModel currentUser, QuestionnaireGroupTemplateQuestionRequest request);

        TemplateGroupScoreModel PutTemplateGroupScore(UserModel currentUser, TemplateGroupScoreModel request);

        List<TemplateGroupScoreModel> GetTemplateGroupScore(UserModel currentUser, int id);
    }
}
