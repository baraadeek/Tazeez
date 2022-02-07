using System;
using System.Collections.Generic;

namespace Tazeez.DB.Models.DB
{
    public class QuestionnaireGroupTemplateQuestion
    {
        public QuestionnaireGroupTemplateQuestion()
        {
            QuestionnaireTemplateQuestion = new HashSet<QuestionnaireTemplateQuestion>();
            TemplateGroupScore = new HashSet<TemplateGroupScore>();
        }

        public int Id { get; set; }

        public int QuestionnaireTemplateId { get; set; }

        public string Name { get; set; }

        public DateTime CreatedDateUTC { get; set; }

        public DateTime LastUpdatedUTC { get; set; }

        public bool Archived { get; set; }

        public ICollection<QuestionnaireTemplateQuestion> QuestionnaireTemplateQuestion { get; set; }
        
        public ICollection<TemplateGroupScore> TemplateGroupScore { get; set; }
        
        public QuestionnaireTemplate QuestionnaireTemplate { get; set; }
    }
}