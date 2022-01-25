using System;
using Tazeez.ModelViews;

namespace Tazeez.Models
{
    public class QuestionnaireAnswerTextModel
    {
        public int Id { get; set; }
        public int QuestionnaireQuestionId { get; set; }
        public string Text { get; set; }
        public int? UserId { get; set; }
        public DateTime CreatedOn { get; set; }
        public bool IsDraft { get; set; }
        public UserModel User { get; set; }
        public bool Archived { get; set; }
    }
}
