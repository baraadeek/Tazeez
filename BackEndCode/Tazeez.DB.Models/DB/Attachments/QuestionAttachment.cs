using Tazeez.DB.Models.DB;

namespace Tazeez.DataAccess.Models
{
    public class QuestionAttachment : Attachment
    {
        public int QuestionId { get; set; }

        public virtual QuestionnaireQuestion Question { get; set; }
    }
}
