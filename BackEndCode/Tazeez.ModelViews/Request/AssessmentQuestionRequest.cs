using JustProtect.Models;
using System.Collections.Generic;
using Tazeez.ModelViews.ModelViews;

namespace Tazeez.Models.Requests
{
    public class AssessmentQuestionRequest
    {
        public AssessmentQuestionRequest()
        {
            QuestionAnswerText = new List<QuestionnaireAnswerTextModel>();
            QuestionAnswerChoice = new List<QuestionChoiceModel>();
            QuestionAttachment = new List<QuestionAttachmentModel>();
        }

        public List<QuestionnaireAnswerTextModel> QuestionAnswerText { get; set; }

        public List<QuestionChoiceModel> QuestionAnswerChoice { get; set; }

        public List<QuestionAttachmentModel> QuestionAttachment { get; set; }

    }
}
