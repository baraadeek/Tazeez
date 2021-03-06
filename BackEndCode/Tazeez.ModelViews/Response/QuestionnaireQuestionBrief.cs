using Tazeez.Enums;

namespace Tazeez.ModelViews.Response
{
    public class QuestionnaireQuestionBrief
    {
        public int QuestionId { get; set; }

        public QuestionStatusEnum Status { get; set; }

        public int DisplayOrder { get; set; }

        public bool IsOptional { get; set; }
    }
}
