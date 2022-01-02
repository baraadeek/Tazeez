using System.ComponentModel.DataAnnotations;

namespace Tazeez.ModelViews.ModelViews
{
    public class QuestionnaireTemplateModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }
    }
}
