using System;

namespace Tazeez.DB.Models.DB
{
    public class QuestionnaireAnswerText
    {
        public int Id { get; set; }

        public int QuestionnaireQuestionId { get; set; }

        public string Text { get; set; }

        public int UserId { get; set; }

        public DateTime CreatedUTC { get; set; }

        public DateTime LastUpdatedUTC { get; set; }

        public bool Archived { get; set; }

        public bool IsDraft { get; set; }

        public QuestionnaireQuestion QuestionnaireQuestion { get; set; }

        public User User { get; set; }
    }
}