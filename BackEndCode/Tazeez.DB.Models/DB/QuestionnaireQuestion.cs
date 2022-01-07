using System;
using System.Collections.Generic;

namespace Tazeez.DB.Models.DB
{
    public class QuestionnaireQuestion
    {
        public QuestionnaireQuestion()
        {
            QuestionnaireAnswerText = new List<QuestionnaireAnswerText>();
            QuestionnaireAnswerChoice = new List<QuestionnaireAnswerChoice>();
        }

        public int Id { get; set; }

        public int TemplateQuestionId { get; set; }

        public int QuestionnaireId { get; set; }

        public int Status { get; set; }

        public DateTime CreatedUTC { get; set; }

        public DateTime LastUpdatedUTC { get; set; }

        public bool Archived { get; set; }

        public virtual QuestionnaireTemplateQuestion QuestionnaireTemplateQuesion { get; set; }
        
        public virtual Questionnaire Questionnaire { get; set; }

        public List<QuestionnaireAnswerText> QuestionnaireAnswerText { get; set; }

        public List<QuestionnaireAnswerChoice> QuestionnaireAnswerChoice { get; set; }
    }
}