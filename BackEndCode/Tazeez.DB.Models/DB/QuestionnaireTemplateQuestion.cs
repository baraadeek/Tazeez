using System;
using System.Collections.Generic;

namespace Tazeez.DB.Models.DB
{
    public class QuestionnaireTemplateQuestion
    {
        public QuestionnaireTemplateQuestion()
        {
            QuestionnaireQuestions = new HashSet<QuestionnaireQuestion>();
        }

        public int Id { get; set; }

        public string Question { get; set; }

        public int QuestionnaireTemplateId { get; set; }

        public int QuestionnaireQuestionTypeId { get; set; }

        public int DisplayOrder { get; set; }

        public int Score { get; set; }

        public bool IsOptional { get; set; }

        public DateTime CreatedUTC { get; set; }

        public DateTime LastUpdatedUTC { get; set; }

        public bool Archived { get; set; }
        
        public virtual QuestionnaireTemplate QuestionnaireTemplate { get; set; }

        public virtual ICollection<QuestionnaireQuestion> QuestionnaireQuestions { get; set; }
    }
}
