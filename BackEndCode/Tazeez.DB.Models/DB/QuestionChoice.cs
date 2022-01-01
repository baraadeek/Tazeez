using System;

namespace Tazeez.DB.Models.DB
{
    public class QuestionChoice
    {
        public int Id { get; set; }

        public int TemplateQuestionId { get; set; }

        public string Choice { get; set; }

        public int Score { get; set; }

        public int DisplayOrder { get; set; }

        public DateTime CreatedUTC { get; set; }

        public DateTime LastUpdatedUTC { get; set; }

        public bool Archived { get; set; }

        public virtual QuestionnaireTemplateQuestion QuestionnaireTemplateQuestion { get; set; }
    }
}
