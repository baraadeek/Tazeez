using System;
using System.Collections.Generic;

namespace Tazeez.DB.Models.DB
{
    public class QuestionnaireTemplate
    {
        public QuestionnaireTemplate()
        {
            QuestionnaireTemplateQuesions = new HashSet<QuestionnaireTemplateQuestion>();
            Questionnaires = new HashSet<Questionnaire>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime CreatedUTC { get; set; }
        
        public DateTime LastUpdatedUTC { get; set; }

        public bool Archived { get; set; }

        public virtual ICollection<QuestionnaireTemplateQuestion> QuestionnaireTemplateQuesions { get; set; }

        public virtual ICollection<Questionnaire> Questionnaires { get; set; }
    }
}