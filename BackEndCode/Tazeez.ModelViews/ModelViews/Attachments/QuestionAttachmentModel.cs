using Tazeez.ModelViews;
using Tazeez.ModelViews.ModelViews;

namespace Tazeez.Models
{
    public class QuestionAttachmentModel : AttachmentModel
    {
        public int QuestionId { get; set; }

        public QuestionnaireQuestionModel Question { get; set; }

        public UserModel User { get; set; }
    }
}