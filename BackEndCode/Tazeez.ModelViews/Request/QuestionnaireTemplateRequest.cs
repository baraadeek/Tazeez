using System.ComponentModel.DataAnnotations;

namespace Tazeez.ModelViews.Request
{
    public class QuestionnaireTemplateRequest
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }
    }
}
