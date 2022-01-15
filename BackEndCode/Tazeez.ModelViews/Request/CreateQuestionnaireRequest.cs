using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Tazeez.ModelViews.Request
{
    public class CreateQuestionnaireRequest
    {
        public CreateQuestionnaireRequest()
        {
            UserIds = new List<int>();
        }

        [Required(ErrorMessage = "Please select a valid questionnaire template id")]
        public int QuestionnaireTemplateId { get; set; }

        public List<int> UserIds { get; set; }

        [Required(ErrorMessage = "Assessment name can't be empty")]
        public string AssessmentName { get; set; }

        [Required(ErrorMessage = "DueDate")]
        [DataType(DataType.DateTime)]
        public DateTime DueDate { get; set; }
    }
}
