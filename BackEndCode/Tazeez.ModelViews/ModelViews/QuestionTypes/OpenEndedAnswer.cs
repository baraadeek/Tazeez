using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using Tazeez.Common.Extensions;
using Tazeez.Models.Models;
using Tazeez.Models.Requests;
using Tazeez.ModelViews;

namespace Tazeez.Models.QuestionTypes
{
    public class OpenEndedAnswer : BaseQuestionType
    {
        public OpenEndedAnswer()
        {
            QuestionnaireAnswerText = new List<QuestionnaireAnswerTextModel>();
        }

        public List<QuestionnaireAnswerTextModel> QuestionnaireAnswerText { get; set; }

        public string Answer { get; set; }

        public override int? AnsweredByUserId { get => QuestionnaireAnswerText.Any() ? QuestionnaireAnswerText.First().UserId : null; }

        public override bool ValidateAnswer(AssessmentQuestionRequest assessmentQuestionRequest, UserModel currentUser, TazeezContext _context)
        {
            var answer = assessmentQuestionRequest.QuestionAnswerText.FirstOrDefault();

            if (answer != null)
            {
               return true;
            }

            throw new ServiceValidationException($"Invalid question answer for question number {QuestionId}");
        }

        public override bool ValidateAnswer(IQuestionAnswerRequest assessmentQuestion, UserModel currentUser, TazeezContext _context, IMapper _mapper)
        {
            QuestionnaireQuestionAnswerTextRequest assessmentQuestionAnswerText = (QuestionnaireQuestionAnswerTextRequest)assessmentQuestion;
            
            var answer = assessmentQuestionAnswerText.Text;

            if (answer != null)
            {
                return true;
            }

            throw new ServiceValidationException($"Invalid question answer for question number {QuestionId}");
        }
    }
}
