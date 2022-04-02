using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using JustProtect.Models;
using Tazeez.Common.Extensions;
using Tazeez.DataAccess.Models;
using Tazeez.DB.Models.DB;
using Tazeez.Enums;
using Tazeez.Models.Models;
using Tazeez.Models.Requests;
using Tazeez.ModelViews;

namespace Tazeez.Models.QuestionTypes
{
    public class MultipleChoiceMultipleAnswer : BaseQuestionType
    {
        public MultipleChoiceMultipleAnswer()
        {
            QuestionnaireQuestionAnswerChoice = new List<QuestionnaireQuestionAnswerChoiceModel>();
            AssessmentQuestionAnswerText = new List<QuestionnaireAnswerTextModel>();
        }

        public string AdditionalAnswer { get; set; }

        public List<QuestionnaireQuestionAnswerChoiceModel> QuestionnaireQuestionAnswerChoice { get; set; }

        public decimal Score => AnswerChoices.Where(a => a.IsChecked).Sum(a => a.Score);

        public List<QuestionnaireAnswerTextModel> AssessmentQuestionAnswerText { get; set; }

        public override int? AnsweredByUserId { get => QuestionnaireQuestionAnswerChoice.Any() ? QuestionnaireQuestionAnswerChoice.First().UserId : null; }

        public override bool ValidateAnswer(AssessmentQuestionRequest assessmentQuestionRequest, UserModel currentUser, TazeezContext _context)
        {
            var answersChoicesIds = assessmentQuestionRequest.QuestionAnswerChoice
                                    .Select(a => a.Id)
                                    .ToList();

            var templateAnswerChoicesIds = QuestionnaireTemplateQuestion.QuestionChoices
                                                                     .Select(a => a.Id)
                                                                     .ToList();

            if (!answersChoicesIds.All(a => templateAnswerChoicesIds.Contains(a)))
            {
                throw new ServiceValidationException($"Invalid answer choice for question number {QuestionId}");
            }

            return true;
        }

        public override bool ValidateAnswer(IQuestionAnswerRequest assessmentQuestion, UserModel currentUser, TazeezContext _context, IMapper _mapper)
        {
            QuestionnaireQuestionAnswerChoiceRequest assessmentQuestionAnswerChoice = (QuestionnaireQuestionAnswerChoiceRequest)assessmentQuestion;

            var templateAnswerChoicesIds = QuestionnaireTemplateQuestion.QuestionChoices
                                                                     .Select(a => a.Id)
                                                                     .ToList();

            if (!assessmentQuestionAnswerChoice.AssessmentQuestionAnswerChoiceIds.All(a => templateAnswerChoicesIds.Contains(a)))
            {
                throw new ServiceValidationException($"Invalid answer choice for question number {QuestionId}");
            }

            return true;
        }

        public override void AnswerQuestion(UserModel currentUser, IQuestionAnswerRequest assessmentQuestionRequest, QuestionnaireQuestion existingQuestion, TazeezContext _context, IMapper _mapper, int questionId)
        {
            QuestionnaireQuestionAnswerChoiceRequest assessmentQuestionAnswerChoiceRequest = (QuestionnaireQuestionAnswerChoiceRequest)assessmentQuestionRequest;

            ValidateAnswer(assessmentQuestionAnswerChoiceRequest, currentUser, _context, _mapper);

            var isDraft = !assessmentQuestionAnswerChoiceRequest.AssessmentQuestionAnswerChoiceIds.Any();

            foreach (var answer in assessmentQuestionAnswerChoiceRequest.AssessmentQuestionAnswerChoiceIds)
            {
                if (existingQuestion.QuestionnaireAnswerChoice.All(a => a.QuestionChoiceId != answer))
                {
                    existingQuestion.QuestionnaireAnswerChoice.Add(new QuestionnaireAnswerChoice
                    {
                        QuestionnaireQuestionId = QuestionId,
                        QuestionChoiceId = answer,
                        UserId = currentUser.Id,
                        IsDraft = isDraft
                    });
                }
            }

            if (isDraft)
            {
                existingQuestion.Status = (int)QuestionStatusEnum.Open;
            }
            else
            {
                existingQuestion.Status = (int)QuestionStatusEnum.Answered;
            }
        }

        public override void AnswerQuestion(UserModel currentUser, AssessmentQuestionRequest assessmentQuestionRequest, QuestionnaireQuestion existingQuestion, TazeezContext _context)
        {
            ValidateAnswer(assessmentQuestionRequest, currentUser, _context);
                       
            var isDraft = !assessmentQuestionRequest.QuestionAnswerChoice.Any();

            foreach (var answer in existingQuestion.QuestionnaireAnswerChoice)
            {
                if (assessmentQuestionRequest.QuestionAnswerChoice
                                             .All(a => a.Id != answer.QuestionChoiceId))
                {
                    answer.Archived = true;
                }
                else
                {
                    answer.IsDraft = isDraft;
                }
            }

            foreach (var answer in assessmentQuestionRequest.QuestionAnswerChoice)
            {
                if (answer.Id == 0)
                {
                    throw new ServiceValidationException($"Invalid answer choice for question number {QuestionId}");
                }

                if (existingQuestion.QuestionnaireAnswerChoice.All(a => a.QuestionChoiceId != answer.Id))
                {
                    existingQuestion.QuestionnaireAnswerChoice.Add(new QuestionnaireAnswerChoice
                    {
                        QuestionnaireQuestionId = QuestionId,
                        QuestionChoiceId = answer.Id,
                        UserId = currentUser.Id,
                        IsDraft = isDraft
                    });
                }
            }

            if (!assessmentQuestionRequest.QuestionAnswerText.Any())
            {
                foreach (var answer in existingQuestion.QuestionnaireAnswerText)
                {
                    answer.Archived = true;
                }
            }
            else
            {
                var answer = assessmentQuestionRequest.QuestionAnswerText.FirstOrDefault();

                var existingAnswer = existingQuestion.QuestionnaireAnswerText.FirstOrDefault(a => a.QuestionnaireQuestionId == answer.QuestionnaireQuestionId);

                if (existingAnswer != null && answer != null && !string.IsNullOrWhiteSpace(answer.Text))
                {
                    existingAnswer.Text = answer.Text;

                    existingAnswer.IsDraft = isDraft;
                }
                else if (answer != null && !string.IsNullOrWhiteSpace(answer.Text))
                {
                    existingQuestion.QuestionnaireAnswerText.Add(new QuestionnaireAnswerText
                    {
                        Text = answer.Text,
                        QuestionnaireQuestionId = QuestionId,
                        UserId = currentUser.Id,
                        IsDraft = isDraft
                    });
                }
            }

            if (isDraft)
            {
                existingQuestion.Status = (int)QuestionStatusEnum.Open;
            }
            else
            {
                existingQuestion.Status = (int)QuestionStatusEnum.Answered;
            }

            foreach (var answer in assessmentQuestionRequest.QuestionAttachment)
            {
                existingQuestion.QuestionAttachment.Add(new QuestionAttachment
                {
                    UserId = currentUser.Id,
                    QuestionnaireId = QuestionnaireId,
                    DisplayName = answer.DisplayName,
                    FileName = answer.FileName,
                    FileKey = $"Questionnaire/{QuestionnaireId}/{QuestionId}/{answer.FileName}",
                    UploadType = answer.UploadType,
                    QuestionId = QuestionId
                });
            }
        }
    }
}
