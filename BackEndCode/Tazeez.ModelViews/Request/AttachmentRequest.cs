namespace Tazeez.Models.Requests
{
    public class AttachmentRequest
    {
        public int Id { get; set; }

        public int? UserId { get; set; }

        public int Source { get; set; }

        public int SourceId { get; set; }

        public int? AssessmentId { get; set; }

        public string FileKey { get; set; }

        public string DisplayName { get; set; }

        public string FileName { get; set; }

        public int UploadType { get; set; }

        public bool IsDraft { get; set; }

        public int Category { get; set; }
    }
}
