using System;

namespace Tazeez.DB.Models.DB
{
    public class TemplateGroupScore
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ScoreDecription { get; set; }

        public int GroupTemplateId { get; set; }

        public int Score { get; set; }

        public DateTime CreatedDateUTC { get; set; }

        public DateTime LastUpdatedUTC { get; set; }

        public bool Archived { get; set; }

        public virtual QuestionnaireGroupTemplateQuestion QuestionnaireGroupTemplateQuestion { get; set; }
    }
}
