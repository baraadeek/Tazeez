using System.Collections.Generic;
using Tazeez.Enums;
using Tazeez.Models.QuestionTypes;

namespace Tazeez.Models.Responses
{
    public class AnsweredQuestionResponseV1
    {
        public List<BaseQuestionType> OpenedQuestions { get; set; }

        public QuestionStatusEnum QuestionStatus { get; set; }
    }
}
