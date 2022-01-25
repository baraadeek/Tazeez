using AutoMapper;
using JustProtect.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Tazeez.Common.Extensions;
using Tazeez.DB.Models.DB;
using Tazeez.Enums;
using Tazeez.Infrastructure;
using Tazeez.Models;
using Tazeez.Models.Models;
using Tazeez.Models.QuestionTypes;
using Tazeez.Models.Responses;
using Tazeez.ModelViews;
using Tazeez.ModelViews.ModelViews;

namespace Tazeez.Core.Managers.Helper
{
    public class HelperManager : IHelperManager
    {
        private readonly IMapper _mapper;
        private TazeezContext _context;
        private readonly IConfigurationSettings _configurationSettings;

        public HelperManager(TazeezContext context, IMapper mapper, IConfigurationSettings configurationSettings)
        {
            _context = context;
            _mapper = mapper;
            _configurationSettings = configurationSettings;
        }

        public string Base64ToString(string base64String)
        {
            byte[] data = Convert.FromBase64String(base64String);
            return Encoding.ASCII.GetString(data);
        }

        public List<BaseQuestionType> ManipulateQuestionByTypeV1(UserModel currentUser,
                                                                 List<QuestionnaireQuestion> assessmentQuestions,
                                                                 Dictionary<int, QuestionnaireTemplateQuestion> assessmentTemplateQuestion,
                                                                 List<int> assessmentQuestionsIds,
                                                                 List<int> assessmentTemplateQuestionsIds,
                                                                 bool readOnly = false)
        {
            var response = new List<BaseQuestionType>();
            if (assessmentQuestions.Count == 0)
            {
                return new List<BaseQuestionType>();
            }

            var metaKeys = new List<string>();

            foreach (var assessmentQuestion in assessmentQuestions)
            {
                assessmentTemplateQuestion[assessmentQuestion.TemplateQuestionId].QuestionChoices
                    = assessmentTemplateQuestion[assessmentQuestion.TemplateQuestionId].QuestionChoices
                                                                                    .OrderBy(a => a.DisplayOrder)
                                                                                    .ToList();

                BaseQuestionType baseQuestionType = assessmentQuestion.QuestionnaireTemplateQuesion.QuestionnaireQuestionTypeId switch
                {
                    1 => GetMultipleChoiceMultipleAnswer(assessmentQuestion, readOnly),
                    2 => GetMultipleChoiceSingleAnswer(assessmentQuestion, readOnly),
                    3 => GetAttachmentOnlyAnswer(assessmentQuestion, readOnly),
                    5 => GetNumberAnswer(assessmentQuestion, readOnly),
                    6 => GetDateTimeAnswer(assessmentQuestion, readOnly),
                    7 => GetOpenEndedAnswer(assessmentQuestion, readOnly),
                    _ => throw new ServiceValidationException("Unsupported Question Type")
                };

                baseQuestionType.QuestionText = assessmentTemplateQuestion[assessmentQuestion.TemplateQuestionId].Question;
                baseQuestionType.DisplayOrder = assessmentTemplateQuestion[assessmentQuestion.TemplateQuestionId].DisplayOrder;
                baseQuestionType.TargetScore = assessmentTemplateQuestion[assessmentQuestion.TemplateQuestionId].Score;

                if (assessmentQuestion.QuestionnaireTemplateQuesion == null || assessmentQuestion.QuestionnaireTemplateQuesion.QuestionnaireQuestionTypeId == 0)
                {
                    throw new ServiceValidationException($"Invalid Question type for question id => {assessmentQuestion.Id}");
                }

                var assessmentTemplateQuestionChoice = baseQuestionType.QuestionnaireTemplateQuesion?.QuestionChoices?.ToList();
                var assessmentQuestionAnswerChoice = assessmentQuestion.QuestionnaireAnswerChoice.ToList();
                baseQuestionType.AnswerChoices = _mapper.Map<List<QuestionChoiceResponse>>(assessmentTemplateQuestionChoice);
                assessmentQuestionAnswerChoice.ForEach(c =>
                {
                    var selectedChoice = baseQuestionType.AnswerChoices?.FirstOrDefault(a => a.Id == c.QuestionChoiceId);
                    if (selectedChoice != null)
                    {
                        selectedChoice.IsChecked = true;
                    }
                });


                baseQuestionType.AttachmentsCount = assessmentQuestion.QuestionAttachment.Count;
                response.Add(baseQuestionType);
            }

            return response;
        }


        private MultipleChoiceMultipleAnswer GetMultipleChoiceMultipleAnswer(QuestionnaireQuestion assessmentQuestion, bool readOnly)
        {
            var questionType = new MultipleChoiceMultipleAnswer
            {
                IsOptional = assessmentQuestion.QuestionnaireTemplateQuesion.IsOptional,
                QuestionId = assessmentQuestion.Id,
                QuestionType = assessmentQuestion.QuestionnaireTemplateQuesion.QuestionnaireQuestionTypeId,
                Status = (QuestionStatusEnum)assessmentQuestion.Status,
                QuestionnaireQuestionAnswerChoice = _mapper.Map<List<QuestionnaireQuestionAnswerChoiceModel>>(assessmentQuestion.QuestionnaireAnswerChoice),
                QuestionAttachment = _mapper.Map<List<QuestionAttachmentModel>>(assessmentQuestion.QuestionAttachment),
                QuestionnaireTemplateQuesion = _mapper.Map<QuestionnaireTemplateQuestionModel>(assessmentQuestion.QuestionnaireTemplateQuesion),
                QuestionnaireId = assessmentQuestion.QuestionnaireId,
                AssignedUserId = assessmentQuestion.Questionnaire.UserId,
                IsReadOnly = readOnly,
                AdditionalAnswer = assessmentQuestion.QuestionnaireAnswerText.FirstOrDefault()?.Text
            };

            return questionType;
        }

        private MultipleChoiceSingleAnswer GetMultipleChoiceSingleAnswer(QuestionnaireQuestion assessmentQuestion, bool readOnly)
        {
            var questionType = new MultipleChoiceSingleAnswer
            {
                IsOptional = assessmentQuestion.QuestionnaireTemplateQuesion.IsOptional,
                QuestionId = assessmentQuestion.Id,
                QuestionType = assessmentQuestion.QuestionnaireTemplateQuesion.QuestionnaireQuestionTypeId,
                Status = (QuestionStatusEnum)assessmentQuestion.Status,
                QuestionnaireQuestionAnswerChoice = _mapper.Map<List<QuestionnaireQuestionAnswerChoiceModel>>(assessmentQuestion.QuestionnaireAnswerChoice),
                QuestionAttachment = _mapper.Map<List<QuestionAttachmentModel>>(assessmentQuestion.QuestionAttachment),
                QuestionnaireTemplateQuesion = _mapper.Map<QuestionnaireTemplateQuestionModel>(assessmentQuestion.QuestionnaireTemplateQuesion),
                QuestionnaireId = assessmentQuestion.QuestionnaireId,
                AssignedUserId = assessmentQuestion.Questionnaire.UserId,
                IsReadOnly = readOnly,
                AdditionalAnswer = assessmentQuestion.QuestionnaireAnswerText.FirstOrDefault()?.Text
            };

            return questionType;
        }

        private OpenEndedAnswer GetOpenEndedAnswer(QuestionnaireQuestion assessmentQuestion, bool readOnly)
        {
            var questionType = new OpenEndedAnswer
            {
                IsOptional = assessmentQuestion.QuestionnaireTemplateQuesion.IsOptional,
                QuestionId = assessmentQuestion.Id,
                QuestionType = assessmentQuestion.QuestionnaireTemplateQuesion.QuestionnaireQuestionTypeId,
                Status = (QuestionStatusEnum)assessmentQuestion.Status,
                QuestionnaireAnswerText = _mapper.Map<List<QuestionnaireAnswerTextModel>>(assessmentQuestion.QuestionnaireAnswerText),
                QuestionnaireTemplateQuesion = _mapper.Map<QuestionnaireTemplateQuestionModel>(assessmentQuestion.QuestionnaireTemplateQuesion),
                QuestionAttachment = _mapper.Map<List<QuestionAttachmentModel>>(assessmentQuestion.QuestionAttachment),
                QuestionnaireId = assessmentQuestion.QuestionnaireId,
                AssignedUserId = assessmentQuestion.Questionnaire.UserId,
                IsReadOnly = readOnly,
                Answer = assessmentQuestion.QuestionnaireAnswerText.FirstOrDefault()?.Text
            };

            return questionType;
        }

        private NumberAnswer GetNumberAnswer(QuestionnaireQuestion assessmentQuestion, bool readOnly)
        {
            var questionType = new NumberAnswer
            {
                IsOptional = assessmentQuestion.QuestionnaireTemplateQuesion.IsOptional,
                QuestionId = assessmentQuestion.Id,
                QuestionType = assessmentQuestion.QuestionnaireTemplateQuesion.QuestionnaireQuestionTypeId,
                Status = (QuestionStatusEnum)assessmentQuestion.Status,
                QuestionnaireAnswerText = _mapper.Map<List<QuestionnaireAnswerTextModel>>(assessmentQuestion.QuestionnaireAnswerText),
                QuestionnaireTemplateQuesion = _mapper.Map<QuestionnaireTemplateQuestionModel>(assessmentQuestion.QuestionnaireTemplateQuesion),
                QuestionAttachment = _mapper.Map<List<QuestionAttachmentModel>>(assessmentQuestion.QuestionAttachment),
                QuestionnaireId = assessmentQuestion.QuestionnaireId,
                AssignedUserId = assessmentQuestion.Questionnaire.UserId,
                IsReadOnly = readOnly,
                Answer = assessmentQuestion.QuestionnaireAnswerText.FirstOrDefault()?.Text,
                AdditionalAnswer = assessmentQuestion.QuestionnaireAnswerText.ToArray().Length > 1 ? assessmentQuestion.QuestionnaireAnswerText.ToArray()[1]?.Text : string.Empty,
            };

            return questionType;
        }

        private DateTimeAnswer GetDateTimeAnswer(QuestionnaireQuestion assessmentQuestion, bool readOnly)
        {
            var questionType = new DateTimeAnswer
            {
                IsOptional = assessmentQuestion.QuestionnaireTemplateQuesion.IsOptional,
                QuestionId = assessmentQuestion.Id,
                QuestionType = assessmentQuestion.QuestionnaireTemplateQuesion.QuestionnaireQuestionTypeId,
                Status = (QuestionStatusEnum)assessmentQuestion.Status,
                QuestionnaireAnswerTextModel = _mapper.Map<List<QuestionnaireAnswerTextModel>>(assessmentQuestion.QuestionnaireAnswerText),
                QuestionnaireTemplateQuesion = _mapper.Map<QuestionnaireTemplateQuestionModel>(assessmentQuestion.QuestionnaireTemplateQuesion),
                QuestionAttachment = _mapper.Map<List<QuestionAttachmentModel>>(assessmentQuestion.QuestionAttachment),
                QuestionnaireId = assessmentQuestion.QuestionnaireId,
                IsReadOnly = readOnly,
                Answer = assessmentQuestion.QuestionnaireAnswerText.FirstOrDefault()?.Text,
                AdditionalAnswer = assessmentQuestion.QuestionnaireAnswerText.ToArray().Length > 1 ? assessmentQuestion.QuestionnaireAnswerText.ToArray()[1]?.Text : string.Empty,
            };

            return questionType;
        }

        private AttachmentOnlyAnswer GetAttachmentOnlyAnswer(QuestionnaireQuestion assessmentQuestion, bool readOnly)
        {
            var questionType = new AttachmentOnlyAnswer
            {
                IsOptional = assessmentQuestion.QuestionnaireTemplateQuesion.IsOptional,
                QuestionId = assessmentQuestion.Id,
                QuestionType = assessmentQuestion.QuestionnaireTemplateQuesion.QuestionnaireQuestionTypeId,
                Status = (QuestionStatusEnum)assessmentQuestion.Status,
                QuestionAttachment = _mapper.Map<List<QuestionAttachmentModel>>(assessmentQuestion.QuestionAttachment),
                QuestionnaireTemplateQuesion = _mapper.Map<QuestionnaireTemplateQuestionModel>(assessmentQuestion.QuestionnaireTemplateQuesion),
                QuestionnaireId = assessmentQuestion.QuestionnaireId,
                IsReadOnly = readOnly,
                AdditionalAnswer = assessmentQuestion.QuestionnaireAnswerText.FirstOrDefault()?.Text
            };

            return questionType;
        }

    }
}
