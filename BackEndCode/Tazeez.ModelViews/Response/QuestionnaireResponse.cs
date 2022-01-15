using System;

namespace Tazeez.ModelViews.Response
{
    public class QuestionnaireResponse
    {
        public int Id { get; set; }

        public int QuestionnaireGroupId { get; set; }

        public int Status { get; set; }
        
        public int StatusOrder { get; set; }
        
        public int UserId { get; set; }

        public int QuestionnaireTemplateId { get; set; }

        public string QuestionnaireTemplateName { get; set; }

        public string QuestionnaireName { get; set; }

        public int NumberOfQuestions { get; set; }
        
        public int NumberOfAnsweredQuestions { get; set; }

        public DateTime? DueDateUTC { get; set; }

        public DateTime? CompletedUtc { get; set; }

        public DateTime CreatedUTC { get; set; }
    }
}