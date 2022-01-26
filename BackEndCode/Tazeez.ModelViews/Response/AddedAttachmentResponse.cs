using System.Collections.Generic;

namespace Tazeez.Models.Responses
{
    public class AddedAttachmentResponse : AnsweredQuestionResponseV1
    {
        public List<int> AttachmentIds { get; set; }
    }
}
