using System;

namespace Tazeez.DB.Models.DB
{
    public class QuestionnaireQuestion
    {
        public int Id { get; set; }

        public int TemplateQuestionId { get; set; }

        public int QuestionnaireId { get; set; }

        public int Status { get; set; }

        public DateTime CreatedUTC { get; set; }

        public DateTime LastUpdatedUTC { get; set; }

        public bool Archived { get; set; }

        public virtual QuestionnaireTemplateQuestion QuestionnaireTemplateQuesion { get; set; }
        
        public virtual Questionnaire Questionnaire { get; set; }
    }
}
