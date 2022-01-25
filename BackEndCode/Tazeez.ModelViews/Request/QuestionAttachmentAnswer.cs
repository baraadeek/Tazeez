using System.Collections.Generic;

namespace Tazeez.Models.Requests
{
    public class QuestionAttachmentAnswer : IQuestionAnswerRequest
    {
        public QuestionAttachmentAnswer()
        {
            QuestionAttachment = new List<QuestionAttachmentRequestModel>(); 
        }
        
        public List<QuestionAttachmentRequestModel> QuestionAttachment { get; set; }
    }
}
