using System.Collections.Generic;

namespace Tazeez.ModelViews.Response
{
    public class QuestionnaireQuestionResponse
    {
        public int NumberOfQuestions { get; set; }

        public int NumberOfAllQuestions { get; set; }

        public int NumberOfAnsweredQuestions { get; set; }

        public int NumberOfNotAnsweredQuestions { get; set; }

        public int? OwnerId { get; set; }

        public int ReceiverBusinessUnitId { get; set; }

        public int AssessmentStatus { get; set; }

        public string UserName { get; set; }

        public string Question { get; set; }

        public int PreviousQuestionId { get; set; }

        public int NextQuestionId { get; set; }

        public int CurrentQuestionIndex { get; set; }

        public bool IsPredecessor { get; set; }
    }
}
