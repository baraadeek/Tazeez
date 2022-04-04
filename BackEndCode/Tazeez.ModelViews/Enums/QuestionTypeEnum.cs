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
        OpenEnded = 3
    }

    public enum QuestionStatusEnum
    {
        [Description("Open")]
        Open = 0,
        [Description("Answered")]
        Answered = 1,
        [Description("Released")]
        Released = 2
    }

    public enum AnswerTypeEnum
    {
        [Description("AnswerQuestion")]
        AnswerQuestion = 1,
        [Description("AnswerQuestionAdditionalInfo")]
        AnswerQuestionAdditionalInfo = 2,
        [Description("AddQuestionAttachment")]
        AddQuestionAttachment = 3
    }
}