using System;

namespace Tazeez.ModelViews.ModelViews
{
    public class QuestionnaireQuestionModel
    {
        public int Id { get; set; }

        public int TemplateQuestionId { get; set; }

        public int QuestionnaireId { get; set; }

        public int Status { get; set; }

        public DateTime CreatedUTC { get; set; }

        public DateTime LastUpdatedUTC { get; set; }

        public bool Archived { get; set; }

        public virtual QuestionnaireTemplateQuestionModel QuestionnaireTemplateQuestion { get; set; }

        public virtual QuestionnaireModel Questionnaire { get; set; }
    }
}
