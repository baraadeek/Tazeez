using System.Collections.Generic;

namespace Tazeez.Models.Requests
{
    public class QuestionnaireQuestionAnswerChoiceRequest : IQuestionAnswerRequest
    {
        public QuestionnaireQuestionAnswerChoiceRequest()
        {
            AssessmentQuestionAnswerChoiceIds = new List<int>();
        }

        public List<int> AssessmentQuestionAnswerChoiceIds { get; set; }
    }
}