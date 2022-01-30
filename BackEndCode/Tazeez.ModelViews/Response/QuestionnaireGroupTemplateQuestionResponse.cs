using System;

namespace Tazeez.ModelViews.Response
{
    public class QuestionnaireGroupTemplateQuestionResponse
    {
        public int Id { get; set; }

        public int QuestionnaireTemplateId { get; set; }

        public int Name { get; set; }

        public DateTime CreatedDateUTC { get; set; }

        public DateTime LastUpdatedUTC { get; set; }

        public bool Archived { get; set; }
    }
}
