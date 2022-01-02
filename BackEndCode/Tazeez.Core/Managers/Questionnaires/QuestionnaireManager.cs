using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Serilog;
using System.Linq;
using Tazeez.Common.Extensions;
using Tazeez.DB.Models.DB;
using Tazeez.Enums;
using Tazeez.Models.Models;
using Tazeez.ModelViews;
using Tazeez.ModelViews.ModelViews;
using Tazeez.ModelViews.Request;

namespace Tazeez.Core.Managers.Questionnaires
{
    public class QuestionnaireManager : IQuestionnaireManager
    {
        private readonly TazeezContext _context;
        private readonly IMapper _mapper;

        public QuestionnaireManager(TazeezContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public QuestionnaireTemplateQuestionModel PutQuestionnaireTemplateQuestion(UserModel currentUser, int questionnaireTemplateId, QuestionnaireTemplateQuestionRequestModel questionnaireTemplateQuesionModel)
        {
            Log.Information($"Inside PutQuestionnaireTemplateQuestion for template id => {questionnaireTemplateId}");

            if (!currentUser.IsAdmin)
            {
                throw new ServiceValidationException("You don't have permission to add questionnaire template question");
            }

            if (questionnaireTemplateQuesionModel.Id == 0 
                && (questionnaireTemplateQuesionModel.QuestionnaireQuestionTypeId == QuestionTypeEnum.McqSingleAnswer
                     || questionnaireTemplateQuesionModel.QuestionnaireQuestionTypeId == QuestionTypeEnum.McqMultipleAnswer) 
                && !questionnaireTemplateQuesionModel.QuestionChoices.Any())
            {
                throw new ServiceValidationException("Invalid Choices for template question");
            }

            if (!_context.QuestionnaireTemplate.Any(a => a.Id == questionnaireTemplateId))
            {
                throw new ServiceValidationException("Invalid questionnaire template id");
            }

            QuestionnaireTemplateQuestion questionnaireTemplateQuesion = null;

            if (questionnaireTemplateQuesionModel.Id > 0)
            {
                questionnaireTemplateQuesion = _context.QuestionnaireTemplateQuestion
                                                       .Include(a => a.QuestionChoices)
                                                       .FirstOrDefault(a => a.Id == questionnaireTemplateQuesionModel.Id)
                                                       ?? throw new ServiceValidationException("Invalid questionnaire template question id");

                questionnaireTemplateQuesion.Question = questionnaireTemplateQuesionModel.Question;
                questionnaireTemplateQuesion.DisplayOrder = questionnaireTemplateQuesionModel.DisplayOrder;
                questionnaireTemplateQuesion.Score = questionnaireTemplateQuesionModel.Score;
                questionnaireTemplateQuesion.IsOptional = questionnaireTemplateQuesionModel.IsOptional;
            }
            else
            {
                questionnaireTemplateQuesion = _context.QuestionnaireTemplateQuestion.Add(new QuestionnaireTemplateQuestion
                {
                    Question = questionnaireTemplateQuesionModel.Question,
                    IsOptional = questionnaireTemplateQuesionModel.IsOptional,
                    DisplayOrder = questionnaireTemplateQuesionModel.DisplayOrder,
                    QuestionnaireQuestionTypeId = (int)questionnaireTemplateQuesionModel.QuestionnaireQuestionTypeId,
                    Score = questionnaireTemplateQuesionModel.Score,
                    QuestionnaireTemplateId = questionnaireTemplateId
                }).Entity;
            }

            foreach (var item in questionnaireTemplateQuesionModel.QuestionChoices)
            {
                if (item.Id > 1)
                {
                    var choice = questionnaireTemplateQuesion.QuestionChoices
                                                             .FirstOrDefault(a => a.Id == item.Id)
                                                             ?? throw new ServiceValidationException("Invalid question choice id");

                    choice.Choice = item.Choice;
                    choice.DisplayOrder = item.DisplayOrder;
                    choice.Score = item.Score;
                }
                else
                {
                    questionnaireTemplateQuesion.QuestionChoices.Add(new QuestionChoice
                    {
                        Choice = item.Choice,
                        DisplayOrder = item.DisplayOrder,
                        Score = item.Score
                    });
                }
            }

            _context.SaveChanges();
            Log.Information($"Finish PutQuestionnaireTemplateQuestion for template id => {questionnaireTemplateId}");
            return _mapper.Map<QuestionnaireTemplateQuestionModel>(questionnaireTemplateQuesion);
        }

        public QuestionnaireTemplateModel PutQuestionnaireTemplate(UserModel currentUser, QuestionnaireTemplateModel questionnaireTemplateModel)
        {
            Log.Information("Inside PutQuestionnaireTemplate");

            if (!currentUser.IsAdmin)
            {
                throw new ServiceValidationException("You don't have permission to add questionnaire template");
            }

            QuestionnaireTemplate questionnaireTemplate = null;
            
            if (questionnaireTemplateModel.Id > 0)
            {
                questionnaireTemplate = _context.QuestionnaireTemplate
                                                .FirstOrDefault(a => a.Id == questionnaireTemplateModel.Id)
                                                ?? throw new ServiceValidationException("Invalid questionnaire template id");

                questionnaireTemplate.Name = questionnaireTemplateModel.Name;
            }
            else
            {
                questionnaireTemplate = _context.QuestionnaireTemplate.Add(new QuestionnaireTemplate { 
                    Name = questionnaireTemplateModel.Name
                }).Entity;
            }

            _context.SaveChanges();
            Log.Information("Finish PutQuestionnaireTemplate");
            return _mapper.Map<QuestionnaireTemplateModel>(questionnaireTemplate);
        }


    }
}
