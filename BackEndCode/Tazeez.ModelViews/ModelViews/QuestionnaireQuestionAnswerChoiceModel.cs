using System;
using Tazeez.ModelViews;

namespace JustProtect.Models
{
    public class QuestionnaireQuestionAnswerChoiceModel
    {
        public int Id { get; set; }
        public int AssessmentQuestionId { get; set; }
        public int? AssessmentQuestionAnswerChoiceId { get; set; }
        public int? UserId { get; set; }
        public bool IsDraft { get; set; }
        public UserModel User { get; set; }
        public DateTime CreatedOn { get; set; }
        public bool Archived { get; set; }
    }
}
