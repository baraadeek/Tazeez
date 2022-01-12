using System;

namespace Tazeez.DB.Models.DB
{
    public class QuestionnaireAnswerChoice
    {
        public int Id { get; set; }

        public int QuestionnaireQuestionId { get; set; }

        public int QuestionChoiceId { get; set; }

        public int UserId { get; set; }

        public DateTime CreatedUTC { get; set; }

        public DateTime LastUpdatedUTC { get; set; }

        public bool Archived { get; set; }

        public QuestionnaireQuestion QuestionnaireQuestion { get; set; }

        public QuestionChoice QuestionChoice { get; set; }

        public User User { get; set; }
    }
}