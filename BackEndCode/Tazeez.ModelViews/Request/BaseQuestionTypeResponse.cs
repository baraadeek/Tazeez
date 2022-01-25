using System.Collections.Generic;
using Tazeez.Enums;

namespace Tazeez.Models.Responses.QuestionsPaginationResponse
{
    public class BaseQuestionTypeResponse
    {
        protected BaseQuestionTypeResponse()
        {
            AnswerChoices = new List<QuestionChoiceResponse>();
        }

        public int QuestionId { get; set; }

        public int CommentsCount { get; set; }

        public int AttachmentsCount { get; set; }

        public int QuestionnaireId { get; set; }

        public int DisplayOrder { get; set; }

        public string QuestionType { get; set; }

        public string QuestionText { get; set; }

        public string Answer { get; set; }

        public string AdditionalAnswer { get; set; }

        public bool IsReadOnly { get; set; }

        public bool IsOptional { get; set; }

        public bool IsQuestionAnswered { get; set; }

        public QuestionStatusEnum Status;

        public int AssignedUserId { get; set; }

        public int? AnsweredByUserId { get; set; }

        /// <summary>
        /// All question template choices.
        /// </summary>
        public List<QuestionChoiceResponse> AnswerChoices { get; set; }
    }
}
