using System;
using System.Collections.Generic;

namespace Tazeez.DB.Models.DB
{
    public class Questionnaire
    {
        public Questionnaire()
        {
            QuestionnaireQuestions = new HashSet<QuestionnaireQuestion>();
        }

        public int Id { get; set; }

        public int QuestionnaireGroupId { get; set; }

        public int Status { get; set; } 

        public int QuestionnaireTemplateId { get; set; } 

        public DateTime? DueDateUTC { get; set; }

        public DateTime CreatedUTC { get; set; }

        public DateTime LastUpdatedUTC { get; set; }

        public bool Archived { get; set; }

        public virtual QuestionnaireGroup QuestionnaireGroup { get; set; }

        public virtual QuestionnaireTemplate QuestionnaireTemplate { get; set; }

        public virtual ICollection<QuestionnaireQuestion> QuestionnaireQuestions { get; set; }
    }
}
