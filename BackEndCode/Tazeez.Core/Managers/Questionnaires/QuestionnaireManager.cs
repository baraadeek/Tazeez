using AutoMapper;
using Serilog;
using System.Linq;
using Tazeez.Common.Extensions;
using Tazeez.DB.Models.DB;
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

            if (!_context.QuestionnaireTemplate.Any(a => a.Id == questionnaireTemplateId))
            {
                throw new ServiceValidationException("Invalid questionnaire template id");
            }

            QuestionnaireTemplateQuestion questionnaireTemplateQuesion = null;

            if (questionnaireTemplateQuesionModel.Id > 0)
            {
                questionnaireTemplateQuesion = _context.QuestionnaireTemplateQuestion
                                                .FirstOrDefault(a => a.Id == questionnaireTemplateQuesionModel.Id)
                                                ?? throw new ServiceValidationException("Invalid questionnaire template question id");

                questionnaireTemplateQuesion.Question = questionnaireTemplateQuesionModel.Question;
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

            _context.SaveChanges();
            Log.Information("Finish PutQuestionnaireTemplateQuestion");

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
