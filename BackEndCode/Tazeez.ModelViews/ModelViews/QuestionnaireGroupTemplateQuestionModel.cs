using System;
using System.Collections.Generic;

namespace Tazeez.ModelViews.ModelViews
{
    public class QuestionnaireGroupTemplateQuestionModel
    {
        public QuestionnaireGroupTemplateQuestionModel()
        {
            TemplateGroupScore = new List<TemplateGroupScoreModel>();
        }

        public int Id { get; set; }

        public int QuestionnaireTemplateId { get; set; }

        public string Name { get; set; }

        public DateTime CreatedDateUTC { get; set; }

        public DateTime LastUpdatedUTC { get; set; }

        public bool Archived { get; set; }

        public List<TemplateGroupScoreModel> TemplateGroupScore { get; set; }
    }
}
