using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using Tazeez.Common.Extensions;
using Tazeez.DB.Models.DB;
using Tazeez.Enums;
using Tazeez.Models.Models;
using Tazeez.ModelViews;
using Tazeez.ModelViews.Enums;
using Tazeez.ModelViews.ModelViews;
using Tazeez.ModelViews.Request;
using Tazeez.ModelViews.Response;

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

        public void CraeteQuestionnaire(UserModel currentUser, CreateQuestionnaireRequest createQuestionnaire)
        {

            if (!createQuestionnaire.UserIds.Any())
            {
                throw new ServiceValidationException("Please select valid receivers");
            }

            var template = _context.QuestionnaireTemplate
                                   .Include("QuestionnaireTemplateQuesions")
                                   .FirstOrDefault(a => a.Id == createQuestionnaire.QuestionnaireTemplateId);

            if (template == null)
            {
                throw new ServiceValidationException("Invalid questionnaire template id received");
            }

            var questionnaireGroup = _context.QuestionnaireGroup.Add(new QuestionnaireGroup 
            { 
                Name = createQuestionnaire.AssessmentName
            }).Entity;

            foreach (var id in createQuestionnaire.UserIds)
            {
                var questionnaire = new Questionnaire
                {
                    QuestionnaireTemplateId = createQuestionnaire.QuestionnaireTemplateId,
                    DueDateUTC = createQuestionnaire.DueDate,
                    Status = (int)AssessmentStatusEnum.Open
                };

                foreach (var templateQuestion in template.QuestionnaireTemplateQuesions)
                {
                    questionnaire.QuestionnaireQuestions.Add(new QuestionnaireQuestion
                    {
                        TemplateQuestionId = templateQuestion.Id
                    });
                }

                questionnaireGroup.Questionnaires.Add(questionnaire);
            }

            _context.SaveChanges();
        }

        public QuestionnaireQuestionResponse GetQuestionnaireQuestions(UserModel currentUser, int id, int questionId)
        {
            Log.Information($"Inside GetAssessmentQuestions assessmentId => {id}");

            _context.IsIgnoreQuestionnaireTemplate = true;

            var assessment = _context.Questionnaire
                                     .Include("User")
                                     .Include("QuestionnaireGroup")
                                     .FirstOrDefault(a => a.Id == id
                                                             && (a.UserId == currentUser.Id || currentUser.IsAdmin));

            if (assessment == null)
            {
                throw new ServiceValidationException("Questionnaire not found");
            }

            var isUserHasFullAccess = assessment.UserId == currentUser.Id || currentUser.IsAdmin;

            var assessmentQuestionBriefs = _context.QuestionnaireQuestion
                                                   .Where(a => a.QuestionnaireId == id)
                                                   .OrderBy(a => a.QuestionnaireTemplateQuesion.DisplayOrder)
                                                   .Select(q => new QuestionnaireQuestionBrief
                                                   {
                                                       QuestionId = q.Id,
                                                       Status = (AssessmentQuestionStatusEnum)q.Status,
                                                       DisplayOrder = q.QuestionnaireTemplateQuesion.DisplayOrder,
                                                       IsOptional = q.QuestionnaireTemplateQuesion.IsOptional
                                                   })
                                                   .ToList();

            if (assessmentQuestionBriefs.Count == 0)
            {
                if (isUserHasFullAccess)
                {
                    return new QuestionnaireQuestionResponse
                    {
                        Question = ""
                    };
                }

                throw new ServiceValidationException("You have no permission to view this question");
            }

            QuestionnaireQuestionBrief currentQuestion = null;
            int previousQuestionId = 0;
            int nextQuestionId = 0;
            if (questionId == 0)
            {
                currentQuestion = assessmentQuestionBriefs.FirstOrDefault(a => a.Status == (int)AssessmentQuestionStatusEnum.Open);
                if (currentQuestion == null)
                {
                    currentQuestion = assessmentQuestionBriefs.FirstOrDefault();
                }
            }
            else
            {
                currentQuestion = assessmentQuestionBriefs.FirstOrDefault(q => q.QuestionId == questionId);
            }

            var currentQuestionIndex = assessmentQuestionBriefs.IndexOf(currentQuestion);
            questionId = currentQuestion.QuestionId;
            previousQuestionId = currentQuestionIndex > 0 ? assessmentQuestionBriefs[currentQuestionIndex - 1].QuestionId : 0;
            nextQuestionId = currentQuestionIndex >= assessmentQuestionBriefs.Count - 1 ? 0 : assessmentQuestionBriefs[currentQuestionIndex + 1].QuestionId;
            
            var response = new QuestionnaireQuestionResponse
            {
                PreviousQuestionId = previousQuestionId,
                NextQuestionId = nextQuestionId,
                CurrentQuestionIndex = currentQuestionIndex + 1,
                NumberOfQuestions = assessmentQuestionBriefs.Count(a => a.Status != (int)AssessmentQuestionStatusEnum.Open),
                NumberOfAllQuestions = assessmentQuestionBriefs.Count,
                OwnerId = assessment.UserId,
                Question = "",
                UserName = $"{assessment.User.FirstName} {assessment.User.LastName}" 
            };

            if (assessment.Status == (int)AssessmentStatusEnum.Completed)
            {
                response.NumberOfAnsweredQuestions = response.NumberOfQuestions;
            }
            else
            {
                response.NumberOfAnsweredQuestions = assessmentQuestionBriefs.Count(a => a.Status != (int)AssessmentQuestionStatusEnum.Open);
                response.NumberOfNotAnsweredQuestions = _context.QuestionnaireQuestion
                                                                .Count(a => a.QuestionnaireId == assessment.Id
                                                                            && a.Status == (int)AssessmentQuestionStatusEnum.Open);
            }


            response.AssessmentStatus = assessment.Status;

            Log.Information($"Finish GetAssessmentQuestions assessmentId => {id}");
            return response;
        }

        public PagedResult<QuestionnaireResponse> GetQuestionnaires(UserModel currentUser,
                                                                    int page = 1,
                                                                    int pageSize = 10,
                                                                    int status = 0,
                                                                    string sortColumn = "",
                                                                    string sortDirection = "")
        {
            Log.Information($"Inside GetQuestionnaires");
            var questionnaire = new PagedResult<QuestionnaireResponse>();
            _context.IsIgnoreQuestionnaireTemplate = true;
            
            var allowedStatuses = new List<int> 
            { 
               (int)AssessmentStatusEnum.Open, 
               (int)AssessmentStatusEnum.InReview,
               (int)AssessmentStatusEnum.InProgress 
            };
            
            var result = _context.Questionnaire
                                 .Where(a => a.UserId == currentUser.Id && (status == 0 || a.Status == status))
                                 .Select(a => new QuestionnaireResponse
                                 {
                                     Id = a.Id,
                                     NumberOfQuestions = a.QuestionnaireQuestions.Count,
                                     QuestionnaireTemplateName = a.QuestionnaireTemplate.Name,
                                     QuestionnaireName = a.QuestionnaireGroup.Name,
                                     QuestionnaireTemplateId = a.QuestionnaireTemplateId,
                                     UserId = a.UserId,
                                     Status = a.Status,
                                     CompletedUtc = a.CompletedUtc,
                                     DueDateUTC = a.DueDateUTC,
                                     StatusOrder = a.Status == 10 ? 1 : a.Status == 3 ? 2 : a.Status == 2 ? 3 : 4,
                                     CreatedUTC = a.CreatedUTC,
                                     NumberOfAnsweredQuestions = a.QuestionnaireQuestions
                                                                  .Count(a => a.Status == (int)AssessmentQuestionStatusEnum.Answered
                                                                              || a.Status == (int)AssessmentQuestionStatusEnum.Released)
                                 })
                                 .Where(a => a.NumberOfQuestions > 0)
                                 .OrderByDescending(a => a.CreatedUTC)
                                 .AsQueryable();

            if (!string.IsNullOrWhiteSpace(sortColumn) && sortDirection.Equals("ascending", StringComparison.InvariantCultureIgnoreCase))
            {
                result = result.OrderBy(sortColumn);
            }
            else if (!string.IsNullOrWhiteSpace(sortColumn) && sortDirection.Equals("descending", StringComparison.InvariantCultureIgnoreCase))
            {
                result = result.OrderByDescending(sortColumn);
            }

            questionnaire = result.GetPaged(page, pageSize);

            questionnaire.Filterable.Add("status", new FilterableKeyModel
            {
                Title = "status",
                Values = ((AssessmentStatusEnum[])Enum.GetValues(typeof(AssessmentStatusEnum)))
                                                        .Select(c => new FilterableValueModel()
                                                        {
                                                            Id = (int)c,
                                                            Title = c.GetDescription().ToString()
                                                        })
                                                        .Where(a => allowedStatuses.Contains(a.Id))
                                                        .ToList()
            });

            questionnaire.Sortable.Add("StatusOrder", "Status");
            questionnaire.Sortable.Add("DueDateUTC", "Due Date");
            questionnaire.Sortable.Add("QuestionnaireName", "Name");
            Log.Information($"Finish GetQuestionnaires");
            return questionnaire;
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


        public List<QuestionnaireTemplateQuestionModel> GetQuestionniareTemplateQuestions(UserModel currentUser, int questionnaireTemplateId)
        {
            if (!currentUser.IsAdmin)
            {
                throw new ServiceValidationException("You don't have permission to add questionnaire template");
            }

            var res = _context.QuestionnaireTemplateQuestion
                              .Include(a => a.QuestionChoices)
                              .Where(a => a.QuestionnaireTemplateId == questionnaireTemplateId)
                              .ToList();

            return _mapper.Map<List<QuestionnaireTemplateQuestionModel>>(res);
        }

        public List<QuestionnaireTemplateResponseModel> GetQuestionniareTemplate(UserModel currentUser)
        {
            if (!currentUser.IsAdmin)
            {
                throw new ServiceValidationException("You don't have permission to add questionnaire template");
            }

            var res = _context.QuestionnaireTemplate
                              .Select(a => new QuestionnaireTemplateResponseModel
                              { 
                                 Id = a.Id, 
                                 Name = a.Name,
                                 NumberOfQuestions = a.QuestionnaireTemplateQuesions.Count,
                                 CreatedDate = a.CreatedUTC
                              })
                              .ToList();
            return res;
        }

    }
}
