using System.Collections.Generic;
using Tazeez.DB.Models.DB;
using Tazeez.Models.QuestionTypes;
using Tazeez.ModelViews;

namespace Tazeez.Core.Managers.Helper
{
    public interface IHelperManager : IManager
    {
        List<BaseQuestionType> ManipulateQuestionByTypeV1(UserModel currentUser, List<QuestionnaireQuestion> assessmentQuestion, 
                                                          Dictionary<int, QuestionnaireTemplateQuestion> assessmentTemplateQuestion,
                                                          List<int> assessmentQuestionsIds,
                                                          List<int> assessmentTemplateQuestionsIds,
                                                          bool readOnly = false);

        string Base64ToString(string base64String);
    }
}
