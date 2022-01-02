using System;
using System.Collections.Generic;

namespace Tazeez.ModelViews.ModelViews
{
    public class QuestionnaireModel
    {
        public QuestionnaireModel()
        {
            QuestionnaireQuestions = new List<QuestionnaireQuestionModel>();
        }

        public int Id { get; set; }

        public int QuestionnaireGroupId { get; set; }

        public int Status { get; set; }

        public int QuestionnaireTemplateId { get; set; }

        public DateTime? DueDateUTC { get; set; }

        public DateTime CreatedUTC { get; set; }

        public DateTime LastUpdatedUTC { get; set; }

        public bool Archived { get; set; }

        public virtual QuestionnaireGroupModel QuestionnaireGroup { get; set; }

        public virtual QuestionnaireTemplateModel QuestionnaireTemplate { get; set; }

        public List<QuestionnaireQuestionModel> QuestionnaireQuestions { get; set; }
    }
}
