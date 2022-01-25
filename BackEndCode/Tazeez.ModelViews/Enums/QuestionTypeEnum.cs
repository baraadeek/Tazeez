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

    public enum QuestionStatusEnum
    {
        [Description("Open")]
        Open = 0,
        [Description("Answered")]
        Answered = 1,
        [Description("Released")]
        Released = 2,
    }
}
