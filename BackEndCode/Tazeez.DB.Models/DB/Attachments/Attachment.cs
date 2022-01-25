using System;
using Tazeez.DB.Models.DB;

namespace Tazeez.DataAccess.Models
{
    public partial class Attachment
    {
        public Attachment()
        {
        }

        public int Id { get; set; }
        public int UserId { get; set; }
        public int Source { get; set; }
        public int? QuestionnaireId { get; set; }
        public string FileKey { get; set; }
        public string DisplayName { get; set; }
        public string FileName { get; set; }
        public int UploadType { get; set; }
        public bool Archived { get; set; }
        public bool IsDraft { get; set; }
        public DateTime CreatedUTC { get; set; }
        public DateTime? LastUpdatedUTC { get; set; }
        public virtual Questionnaire Questionnaire { get; set; }
        public virtual User User { get; set; }
    }
}
