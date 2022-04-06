using System.ComponentModel.DataAnnotations;

namespace Tazeez.ModelViews.Request
{
    public class QuestionnaireGroupTemplateQuestionRequest
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "QuestionnaireTemplateId is required")]
        public int QuestionnaireTemplateId { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }
    }
}
