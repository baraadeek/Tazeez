using System.ComponentModel;

namespace Tazeez.Enums
{
    public enum QuestionTypeEnum
    {
        [Description("MultipleChoiceQuestionSingleAnswer")]
        McqSingleAnswer = 1,
        [Description("MultipleChoiceQuestionMultipleAnswer")]
        McqMultipleAnswer = 2,
        [Description("OpenEnded")]
        OpenEnded = 3,
        [Description("AttachmentOnlyAnswer")]
        AttachmentOnlyAnswer = 4, 
        [Description("NumberAnswer")]
        NumberAnswer = 5,
        [Description("DateTimeAnswer")]
        DateTimeAnswer = 6
    }
}
