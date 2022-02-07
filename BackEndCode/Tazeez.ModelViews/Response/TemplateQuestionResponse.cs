using System.Collections.Generic;
using Tazeez.ModelViews.ModelViews;

namespace Tazeez.ModelViews.Response
{
    public class TemplateQuestionResponse
    {

        public TemplateQuestionResponse()
        {
            Questions = new Dictionary<int, List<QuestionnaireTemplateQuestionModel>>();
            QuestionsGroup = new Dictionary<int, QuestionnaireGroupTemplateQuestionResponse>();
        }

        public Dictionary<int, List<QuestionnaireTemplateQuestionModel>> Questions { get; set; }
         
        public Dictionary<int, QuestionnaireGroupTemplateQuestionResponse> QuestionsGroup { get; set; }
    }
}
