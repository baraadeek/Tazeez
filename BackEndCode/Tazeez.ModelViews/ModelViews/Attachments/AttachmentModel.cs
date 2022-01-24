using System;

namespace Tazeez.Models
{
    public class AttachmentModel
    {
        public AttachmentModel()
        {
        }

        public int Id { get; set; }
        
        public int? UserId { get; set; }
       
        public int Source { get; set; }

        public int SourceId { get; set; }

        public int? QuestionnaireId { get; set; }
        
        public string S3fileKey { get; set; }
        
        public string DisplayName { get; set; }
        
        public string FileName { get; set; }
        
        public int UploadType { get; set; }
        
        public bool Archived { get; set; }

        public bool IsDraft { get; set; }
        
        public DateTime CreatedOn { get; set; }
    }
}
