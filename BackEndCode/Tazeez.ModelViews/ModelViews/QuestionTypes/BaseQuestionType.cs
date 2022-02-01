using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using Tazeez.Common.Extensions;
using Tazeez.DataAccess.Models;
using Tazeez.DB.Models.DB;
using Tazeez.Enums;
using Tazeez.Models.Models;
using Tazeez.Models.Requests;
using Tazeez.Models.Responses;
using Tazeez.Models.Static;
using Tazeez.ModelViews;
using Tazeez.ModelViews.ModelViews;

namespace Tazeez.Models.QuestionTypes
{
    public abstract class BaseQuestionType
    {
        protected BaseQuestionType()
        {
            QuestionAttachment = new List<QuestionAttachmentModel>();
            AnswerChoices = new List<QuestionChoiceResponse>();
        }

        public int QuestionId { get; set; }

        public int AttachmentsCount { get; set; }

        public decimal? TargetScore { get; set; }

        public int QuestionnaireId { get; set; }

        public int DisplayOrder { get; set; }

        public bool IsOptional { get; set; }

        public int QuestionType { get; set; }

        public string QuestionText { get; set; }

        public bool IsReadOnly { get; set; }

        public string QuestionnaireGroupTemplateQuestionName { get; set; }

        public int? QuestionnaireGroupTemplateQuestionId { get; set; }
         
        public List<QuestionChoiceResponse> AnswerChoices { get; set; }

        public QuestionStatusEnum Status;

        public int AssignedUserId { get; set; }

        public bool IsQuestionAnswered { 
            get
            {
                return Status == QuestionStatusEnum.Answered
                         || Status == QuestionStatusEnum.Released;
            }
        }

        public List<QuestionAttachmentModel> QuestionAttachment { get; set; }

        public QuestionnaireTemplateQuestionModel QuestionnaireTemplateQuesion { get; set; }

        public abstract int? AnsweredByUserId { get; }
        
        public abstract bool ValidateAnswer(AssessmentQuestionRequest assessmentQuestion, UserModel currentUser, TazeezContext _context);

        public abstract bool ValidateAnswer(IQuestionAnswerRequest assessmentQuestion, UserModel currentUser, TazeezContext _context, IMapper _mapper);

        public virtual void AnswerQuestion(UserModel currentUser,
                                           IQuestionAnswerRequest assessmentQuestionRequest,
                                           QuestionnaireQuestion existingQuestion,
                                           TazeezContext _context,
                                           IMapper _mapper,
                                           int questionId)
        {
            QuestionnaireQuestionAnswerTextRequest assessmentQuestionAnswerText = (QuestionnaireQuestionAnswerTextRequest)assessmentQuestionRequest;

            var isDraft =  !existingQuestion.QuestionAttachment.Any()
                            || (existingQuestion.QuestionnaireAnswerText.Count < 2);

            if (string.IsNullOrWhiteSpace(assessmentQuestionAnswerText.Text) 
                && existingQuestion.QuestionnaireAnswerText.Any())
            {
                var answerText = existingQuestion.QuestionnaireAnswerText.First();
                answerText.Text = "";
                answerText.UserId = currentUser.Id;
                isDraft = true;
            }

            if (existingQuestion.QuestionnaireAnswerText.Any() && !string.IsNullOrWhiteSpace(assessmentQuestionAnswerText.Text))
            {
                var answerText = existingQuestion.QuestionnaireAnswerText.First();
                answerText.Text = assessmentQuestionAnswerText.Text;
                answerText.UserId = currentUser.Id;
            }
            else
            {
                existingQuestion.QuestionnaireAnswerText.Add(new QuestionnaireAnswerText
                {
                    Text = assessmentQuestionAnswerText.Text,
                    QuestionnaireQuestionId = QuestionId,
                    UserId = currentUser.Id,
                });
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

        public virtual void AnswerQuestion(UserModel currentUser, 
                                           AssessmentQuestionRequest assessmentQuestionRequest,
                                           QuestionnaireQuestion existingQuestion,
                                           TazeezContext _context)
        {
            if (!assessmentQuestionRequest.QuestionAnswerText.Any())
            {
                foreach (var answer in existingQuestion.QuestionnaireAnswerText)
                {
                    answer.Archived = true;
                }

                existingQuestion.Status = (int)QuestionStatusEnum.Open;
            }
            else
            {
                ValidateAnswer(assessmentQuestionRequest, currentUser, _context);

                var answer = assessmentQuestionRequest.QuestionAnswerText.FirstOrDefault();
                var existingAnswer = existingQuestion.QuestionnaireAnswerText
                                                     .FirstOrDefault(a => a.QuestionnaireQuestionId == answer.QuestionnaireQuestionId);

                var isDraft = ((!assessmentQuestionRequest.QuestionAttachment.Any()
                                                        && !existingQuestion.QuestionAttachment.Any()))
                                || !assessmentQuestionRequest.QuestionAnswerText.Any();

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

                if (isDraft)
                {
                    existingQuestion.Status = (int)QuestionStatusEnum.Open;
                }
                else
                {
                    existingQuestion.Status = (int)QuestionStatusEnum.Answered;
                }
            }

            foreach (var answer in assessmentQuestionRequest.QuestionAttachment)
            {
                existingQuestion.QuestionAttachment.Add(new QuestionAttachment
                {
                    UserId = currentUser.Id,
                    QuestionnaireId = QuestionnaireId,
                    DisplayName = answer.DisplayName,
                    FileName = answer.FileName,
                    FileKey = $"questionnaire/{QuestionnaireId}/{QuestionId}/{answer.FileName}",
                    UploadType = answer.UploadType,
                    QuestionId = QuestionId
                });
            }
        }
        
        public bool ValidateQuestionAttachment(QuestionAttachmentAnswer questionAttachment) 
        {
            if (questionAttachment.QuestionAttachment.Any())
            {
                return true;
            }

            throw new ServiceValidationException($"Invalid question answer for question number {QuestionId}");
        }

        public void UpdateAdditionalInfo(UserModel currentUser,
                                         IQuestionAnswerRequest assessmentQuestionRequest,
                                         QuestionnaireQuestion existingQuestion,
                                         TazeezContext _context)
        {
            QuestionnaireQuestionAnswerTextRequest assessmentQuestionAnswerText = (QuestionnaireQuestionAnswerTextRequest)assessmentQuestionRequest;

            var isDraft = !existingQuestion.QuestionAttachment.Any();

            if (StaticData.TextAnswerQuestionType.Contains(existingQuestion.QuestionnaireTemplateQuesion.QuestionnaireQuestionTypeId))
            {
                if (existingQuestion.QuestionnaireAnswerText.FirstOrDefault() == null)
                {
                    existingQuestion.QuestionnaireAnswerText.Add(new QuestionnaireAnswerText
                    {
                        Text = "",
                        QuestionnaireQuestionId = QuestionId,
                        UserId = currentUser.Id,
                        IsDraft = isDraft
                    });

                    isDraft = true;
                }

                if (string.IsNullOrWhiteSpace(assessmentQuestionAnswerText.Text))
                {
                    if (existingQuestion.QuestionnaireAnswerText.Count > 1)
                    {
                        existingQuestion.QuestionnaireAnswerText.ToList()[1].Archived = true;
                    }
                }
                else if (existingQuestion.QuestionnaireAnswerText.Count > 1)
                {
                    var answerText = existingQuestion.QuestionnaireAnswerText.ToList()[1];
                    answerText.Text = assessmentQuestionAnswerText.Text;
                    answerText.IsDraft = isDraft;
                }
                else
                {
                    existingQuestion.QuestionnaireAnswerText.Add(new QuestionnaireAnswerText
                    {
                        Text = assessmentQuestionAnswerText.Text,
                        QuestionnaireQuestionId = QuestionId,
                        UserId = currentUser.Id,
                         IsDraft = isDraft                        
                    });
                }
            }
            else
            {
                if (string.IsNullOrWhiteSpace(assessmentQuestionAnswerText.Text))
                {
                    var answerText = existingQuestion.QuestionnaireAnswerText.FirstOrDefault();
                    if (answerText != null)
                    {
                        answerText.Archived = true;
                        isDraft = true;
                    }
                }
                else if (existingQuestion.QuestionnaireAnswerText.Count == 0)
                {
                    existingQuestion.QuestionnaireAnswerText.Add(new QuestionnaireAnswerText
                    {
                        Text = assessmentQuestionAnswerText.Text,
                        QuestionnaireQuestionId = QuestionId,
                        UserId = currentUser.Id,
                    });
                }
                else
                {
                    var answerText = existingQuestion.QuestionnaireAnswerText.FirstOrDefault();
                    answerText.Text = assessmentQuestionAnswerText.Text;
                    answerText.IsDraft = isDraft;
                }
            }

            isDraft = ComputeIsDraft(existingQuestion, isDraft);

            if (isDraft)
            {
                existingQuestion.Status = (int)QuestionStatusEnum.Open;
            }
            else
            {
                existingQuestion.Status = (int)QuestionStatusEnum.Answered;
            }
        }

        private bool ComputeIsDraft(QuestionnaireQuestion existingQuestion, bool isDraft)
        {
            if (!isDraft)
            {
                if (StaticData.MultipleChoiceQuestion.Contains(QuestionType) 
                    && existingQuestion.QuestionnaireAnswerChoice.Count == 0)
                {
                    isDraft = true;
                }
                else if (StaticData.MultipleChoiceQuestion.Contains(QuestionType))
                {
                    List<int> choiceIds = existingQuestion.QuestionnaireAnswerChoice.Select(a => a.QuestionChoiceId).ToList();
                    isDraft = IsDraft(existingQuestion, choiceIds);
                }
                else if (StaticData.TextAnswerQuestionType.Contains(QuestionType) 
                    && (existingQuestion.QuestionnaireAnswerText.FirstOrDefault() == null 
                         || string.IsNullOrWhiteSpace(existingQuestion.QuestionnaireAnswerText.First().Text)))
                {
                    isDraft = true;
                }
            }

            return isDraft;
        }

        protected bool IsDraft(QuestionnaireQuestion existingQuestion, List<int> choiceIds)
        {
            bool isDraft;

            isDraft = (!existingQuestion.QuestionAttachment.Any())
                            || (!existingQuestion.QuestionnaireAnswerText.Any(a => !string.IsNullOrWhiteSpace(a.Text) && a.Archived != true))
                            || !choiceIds.Any();

            foreach (var answerChoice in existingQuestion.QuestionnaireAnswerChoice)
            {
                if (choiceIds.All(a => a != answerChoice.QuestionChoiceId))
                {
                    answerChoice.Archived = true;
                }
            }

            return isDraft;
        }

        public void AddQuestionAttachment(UserModel currentUser,
                                         IQuestionAnswerRequest assessmentQuestionRequest,
                                         QuestionnaireQuestion existingQuestion,
                                         TazeezContext _context,
                                         IMapper _mapper)
        {
            QuestionAttachmentAnswer assessmentQuestionAttachmentAnswer = (QuestionAttachmentAnswer)assessmentQuestionRequest;

            ValidateQuestionAttachment(assessmentQuestionAttachmentAnswer);

            var isDraft = false;

            foreach (var answer in assessmentQuestionAttachmentAnswer.QuestionAttachment)
            {
                var fileName = $"Questionnaire/{QuestionnaireId}/{QuestionId}/{answer.FileName}";

                if (!existingQuestion.QuestionAttachment.Any(a => a.FileKey.Equals(fileName)))
                {
                    var questionAttachment = _mapper.Map<QuestionAttachment>(new QuestionAttachmentRequestModel
                    {
                        UserId = currentUser.Id,
                        AssessmentId = QuestionnaireId,
                        DisplayName = answer.DisplayName,
                        FileName = answer.FileName,
                        FileKey = fileName,
                        UploadType = answer.UploadType,
                        QuestionId = QuestionId
                    });
                    
                    existingQuestion.QuestionAttachment.Add(questionAttachment);
                }
            }

            if (!StaticData.TextAnswerQuestionType.Contains(QuestionType))
            {
                isDraft = !existingQuestion.QuestionnaireAnswerText.Any();
            }
            else
            {
                isDraft =  (existingQuestion.QuestionnaireAnswerText.Count < 2 
                             || string.IsNullOrWhiteSpace(existingQuestion.QuestionnaireAnswerText.ToList()[1].Text));
            }

            isDraft = ComputeIsDraft(existingQuestion, isDraft);

            if (!isDraft)
            {
                existingQuestion.Status = (int)QuestionStatusEnum.Answered;
            }
            else
            {
                existingQuestion.Status = (int)QuestionStatusEnum.Open;
            }

            _context.SaveChanges();
        }
    }
}
