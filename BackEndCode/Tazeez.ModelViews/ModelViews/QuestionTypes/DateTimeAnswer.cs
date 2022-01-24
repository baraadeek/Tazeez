using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using Tazeez.Common.Extensions;
using Tazeez.Models.Models;
using Tazeez.Models.Requests;
using Tazeez.ModelViews;

namespace Tazeez.Models.QuestionTypes
{
    public class DateTimeAnswer : BaseQuestionType
    {
        public DateTimeAnswer()
        {
            QuestionnaireAnswerTextModel = new List<QuestionnaireAnswerTextModel>();
        }

        public string AdditionalAnswer { get; set; }

        public string Answer { get; set; }

        public List<QuestionnaireAnswerTextModel> QuestionnaireAnswerTextModel { get; set; }

        public override int? AnsweredByUserId { get => QuestionnaireAnswerTextModel.Any() ? QuestionnaireAnswerTextModel.First().UserId : null; }

        public override bool ValidateAnswer(AssessmentQuestionRequest assessmentQuestionRequest, UserModel currentUser, TazeezContext _context)
        {
            var answer = assessmentQuestionRequest.QuestionAnswerText.FirstOrDefault();

            if (answer != null && DateTime.TryParse(answer.Text, out _))
            {
                return true;
            }

            throw new ServiceValidationException($"Invalid question answer for question number {QuestionId}");
        }
        public override bool ValidateAnswer(IQuestionAnswerRequest assessmentQuestionRequest, UserModel currentUser, TazeezContext _context, IMapper _mapper)
        {
            QuestionnaireQuestionAnswerTextRequest assessmentQuestionAnswerText = (QuestionnaireQuestionAnswerTextRequest)assessmentQuestionRequest;

            var answer = assessmentQuestionAnswerText.Text;

            if (answer != null && DateTime.TryParse(answer, out _))
            {
                return true;
            }

            throw new ServiceValidationException($"Invalid question answer for question number {QuestionId}");
        }
    }
}
