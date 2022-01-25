using AutoMapper;
using System.Linq;
using Tazeez.Common.Extensions;
using Tazeez.DataAccess.Models;
using Tazeez.DB.Models.DB;
using Tazeez.Enums;
using Tazeez.Models.Models;
using Tazeez.Models.Requests;
using Tazeez.ModelViews;

namespace Tazeez.Models.QuestionTypes
{
    public class AttachmentOnlyAnswer : BaseQuestionType
    {
        public override int? AnsweredByUserId { get => QuestionAttachment.Any() ? QuestionAttachment.First().UserId : null; }

        public string AdditionalAnswer { get; set; }

        public override bool ValidateAnswer(AssessmentQuestionRequest assessmentQuestionRequest, UserModel currentUser, TazeezContext _context)
        {
            if (assessmentQuestionRequest.QuestionAttachment.Any())
            {
                return true;
            }

            throw new ServiceValidationException($"Invalid question answer for question number {QuestionId}");
        }

        public override void AnswerQuestion(UserModel currentUser, AssessmentQuestionRequest assessmentQuestionRequest, QuestionnaireQuestion existingQuestion, TazeezContext _context)
        {
            ValidateAnswer(assessmentQuestionRequest, currentUser, null);

            foreach (var answer in assessmentQuestionRequest.QuestionAttachment)
            {
                existingQuestion.QuestionAttachment.Add(new QuestionAttachment
                {
                    UserId = currentUser.Id,
                    QuestionnaireId = QuestionnaireId,
                    DisplayName = answer.DisplayName,
                    FileName = answer.FileName,
                    FileKey = $"QuestionnaireId/{QuestionnaireId}/{QuestionId}/{answer.FileName}",
                    UploadType = answer.UploadType,
                    QuestionId = QuestionId
                });

                existingQuestion.Status = (int)QuestionStatusEnum.Answered;
            }
        }

        public override bool ValidateAnswer(IQuestionAnswerRequest assessmentQuestion, UserModel currentUser, TazeezContext _context, IMapper _mapper)
        {
            throw new System.NotImplementedException();
        }
    }
}
