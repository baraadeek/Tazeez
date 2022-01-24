using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using Tazeez.Common.Extensions;
using Tazeez.Models.Models;
using Tazeez.Models.Requests;
using Tazeez.ModelViews;

namespace Tazeez.Models.QuestionTypes
{
    public class NumberAnswer : BaseQuestionType
    {
        public NumberAnswer()
        {
            QuestionnaireAnswerText = new List<QuestionnaireAnswerTextModel>();
        }

        public string AdditionalAnswer { get; set; }

        public string Answer { get; set; }

        public List<QuestionnaireAnswerTextModel> QuestionnaireAnswerText { get; set; }
        
        public override int? AnsweredByUserId { get => QuestionnaireAnswerText.Any() ? QuestionnaireAnswerText.First().UserId : null; }

        public override bool ValidateAnswer(AssessmentQuestionRequest assessmentQuestionRequest, UserModel currentUser, TazeezContext _context)
        {
            var answer = assessmentQuestionRequest.QuestionAnswerText.FirstOrDefault();

            if (answer != null)
            {
                if (double.TryParse(answer.Text.Trim(), out double _))
                {
                    return true;
                }
            }

            throw new ServiceValidationException($"Invalid question answer for question number {QuestionId}");
        }
        public override bool ValidateAnswer(IQuestionAnswerRequest assessmentQuestionRequest, UserModel currentUser, TazeezContext _context, IMapper _mapper)
        {
            QuestionnaireQuestionAnswerTextRequest assessmentQuestionAnswerText = (QuestionnaireQuestionAnswerTextRequest)assessmentQuestionRequest;

            var answer = assessmentQuestionAnswerText.Text;

            if (answer != null)
            {
                if (double.TryParse(answer.Trim(), out double _))
                {
                    return true;
                }
            }

            throw new ServiceValidationException($"Invalid question answer for question number {QuestionId}");
        }
    }
}
