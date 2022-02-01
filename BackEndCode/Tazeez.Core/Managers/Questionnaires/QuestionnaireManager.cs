using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tazeez.Common.Extensions;
using Tazeez.Core.Managers.Helper;
using Tazeez.DB.Models.DB;
using Tazeez.Enums;
using Tazeez.Models.Models;
using Tazeez.Models.QuestionTypes;
using Tazeez.Models.Requests;
using Tazeez.Models.Responses;
using Tazeez.Models.Responses.QuestionsPaginationResponse;
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
        private readonly IHelperManager _helperManager;

        public QuestionnaireManager(TazeezContext context, IMapper mapper, IHelperManager helperManager)
        {
            _context = context;
            _mapper = mapper;
            _helperManager = helperManager;
        }

        public void ArchiveQuestionnaireTemplate(UserModel currentUser, int id)
        {
            if (!currentUser.IsAdmin)
            {
                throw new ServiceValidationException("You don't have permission to archive questionnaire template");
            }

            var template = _context.QuestionnaireTemplate
                                   .FirstOrDefault(a => a.Id == id)
                                   ?? throw new ServiceValidationException("Invalid questionnaire template id received");

            template.Archived = true;
            _context.SaveChanges();
        }

        public void CraeteQuestionnaire(UserModel currentUser, CreateQuestionnaireRequest createQuestionnaire)
        {

            if (!createQuestionnaire.UserIds.Any())
            {
                throw new ServiceValidationException("Please select valid receivers");
            }

            var template = _context.QuestionnaireTemplate
                                   .Include("QuestionnaireTemplateQuesions")
                                   .FirstOrDefault(a => a.Id == createQuestionnaire.QuestionnaireTemplateId)
                                   ?? throw new ServiceValidationException("Invalid questionnaire template id received");

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
                    Status = (int)AssessmentStatusEnum.Open,
                    UserId = id
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

        public QuestionnaireQuestionsResponseV1 GetQuestionnaireQuestions(UserModel currentUser,
                                                                       int questionnaireId,
                                                                       int page,
                                                                       int pageSize,
                                                                       int questionId = 0,
                                                                       SearchTextRequest searchText = null)
        {
            Log.Information($"Inside GetQuestionnaireQuestions questionnaireId => {questionnaireId}");
            if (searchText != null && !string.IsNullOrWhiteSpace(searchText.SearchText))
            {
                searchText.SearchText = _helperManager.Base64ToString(searchText.SearchText);
            }

            var questionnaire = _context.Questionnaire
                                     .Include("QuestionnaireGroup")
                                     .Include("User")
                                     .Include("QuestionnaireTemplate")
                                     .FirstOrDefault(a => a.Id == questionnaireId && (a.UserId == currentUser.Id || currentUser.IsAdmin));

            if (questionnaire == null)
            {
                throw new ServiceValidationException("Questionnaire not found");
            }

            var assessmentQuestionBriefs = _context.QuestionnaireQuestion
                                                   .Where(a => a.QuestionnaireId == questionnaireId
                                                               && (searchText == null 
                                                                   || string.IsNullOrWhiteSpace(searchText.SearchText) 
                                                                   || a.QuestionnaireTemplateQuesion
                                                                       .Question
                                                                       .Contains(searchText.SearchText, StringComparison.InvariantCultureIgnoreCase))
                                                               && (questionId == 0 || a.Id == questionId))
                                                   .OrderBy(a => a.QuestionnaireTemplateQuesion.DisplayOrder)
                                                   .Select(q => new QuestionnaireQuestionBrief
                                                   {
                                                       QuestionId = q.Id,
                                                       Status = (QuestionStatusEnum)q.Status,
                                                       DisplayOrder = q.QuestionnaireTemplateQuesion.DisplayOrder,
                                                       IsOptional = q.QuestionnaireTemplateQuesion.IsOptional
                                                   });

            var assessmentQuestions = assessmentQuestionBriefs.GetPaged(page, pageSize);
            var assessmentQuestionsDetails = LoadAssessmentQuestion(currentUser,
                                                                    questionnaire,
                                                                    false,
                                                                    assessmentQuestions.Data.Select(a => a.QuestionId).ToList());

            var response = new QuestionnaireQuestionsResponseV1
            {
                Questions = new PagedResult<BaseQuestionTypeResponse>
                {
                    Data = _mapper.Map<List<BaseQuestionTypeResponse>>(assessmentQuestionsDetails.OrderBy(a => a.QuestionnaireTemplateQuesion.DisplayOrder)
                                                                                                 .ToList()),
                    Pagination = assessmentQuestions.Pagination
                },
                QuestionnaireTitle = questionnaire.QuestionnaireGroup.Name,
                QuestionnaireTemplateName = questionnaire.QuestionnaireTemplate.Name,
                QuestionnaireTemplate = questionnaire.QuestionnaireTemplate.Id,
                OwnerId = questionnaire.UserId
            };

            var assignedUsersIds = response.Questions.Data.Select(q => q.AssignedUserId).ToList();
            assignedUsersIds.AddRange(response.Questions.Data.Where(a => a.AnsweredByUserId.HasValue).Select(q => q.AnsweredByUserId.Value).ToList());
            assignedUsersIds.Add(questionnaire.UserId);
            assignedUsersIds = assignedUsersIds.Distinct().ToList();
            response.AssignedUsers = _context.User
                                             .Where(u => assignedUsersIds.Contains(u.Id))
                                             .ToList()
                                             .ToDictionary(x => x.Id, x => _mapper.Map<SearchUserModel>(x));
            response.OwnerId = questionnaire.UserId;
            Log.Information($"Finish GetQuestionnaireQuestions questionnaireId => {questionnaireId}");
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
                                                                  .Count(a => a.Status == (int)QuestionStatusEnum.Answered
                                                                              || a.Status == (int)QuestionStatusEnum.Released)
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
        
        public QuestionnaireGroupTemplateQuestionResponse PutQuestionnaireGroupTemplateQuestion(UserModel currentUser, QuestionnaireGroupTemplateQuestionRequest request)
        {
            Log.Information("Inside PutQuestionnaireTemplate");

            if (!currentUser.IsAdmin)
            {
                throw new ServiceValidationException("You don't have permission to add questionnaire template");
            }

            QuestionnaireGroupTemplateQuestion response = null;

            if (request.Id > 0)
            {
                response = _context.QuestionnaireGroupTemplateQuestion
                                   .FirstOrDefault(a => a.Id == request.Id 
                                                        && a.QuestionnaireTemplateId == request.QuestionnaireTemplateId)
                                   ?? throw new ServiceValidationException("Invalid questionnaire template id");

                response.Name = request.Name;
            }
            else
            {
                response = _context.QuestionnaireGroupTemplateQuestion.Add(new QuestionnaireGroupTemplateQuestion
                { 
                    Name = request.Name,
                    QuestionnaireTemplateId = request.QuestionnaireTemplateId
                }).Entity;
            }

            _context.SaveChanges();
            Log.Information("Finish PutQuestionnaireTemplate");
            return _mapper.Map<QuestionnaireGroupTemplateQuestionResponse>(response);
        }

        public Dictionary<string, List<QuestionnaireTemplateQuestionModel>> GetQuestionniareTemplateQuestions(UserModel currentUser, int questionnaireTemplateId)
        {
            if (!currentUser.IsAdmin)
            {
                throw new ServiceValidationException("You don't have permission to add questionnaire template");
            }

            var res = _context.QuestionnaireTemplateQuestion
                              .Include(a => a.QuestionnaireGroupTemplateQuestion)
                              .Include(a => a.QuestionChoices)
                              .Where(a => a.QuestionnaireTemplateId == questionnaireTemplateId)
                              .AsEnumerable()
                              .GroupBy(a => a.QuestionnaireGroupTemplateQuestion.Id)
                              .ToDictionary(a => a.FirstOrDefault()?.QuestionnaireGroupTemplateQuestion?.Name, x => x.ToList());

            return _mapper.Map<Dictionary<string,List<QuestionnaireTemplateQuestionModel>>>(res);
        }

        public List<QuestionnaireTemplateResponseModel> GetQuestionniareTemplate(UserModel currentUser, string name = "")
        {
            if (!currentUser.IsAdmin)
            {
                throw new ServiceValidationException("You don't have permission to add questionnaire template");
            }

            var res = _context.QuestionnaireTemplate
                              .Where(a => string.IsNullOrWhiteSpace(name) || a.Name.Contains(name))
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

        public void UpdateAssessmentStatus(UserModel currentUser, int assessmentId, int status)
        {
            Log.Information($"Inside UpdateAssessmentStatusAsync assessmentId => {assessmentId}, status => {status}");

            if (assessmentId == 0 || status == 0)
            {
                throw new ServiceValidationException("Invalid data received");
            }

            var existingAssessment = _context.Questionnaire
                                          .Include("QuestionnaireTemplate")
                                          .FirstOrDefault(a => a.Id == assessmentId
                                                                   && (a.UserId == currentUser.Id || currentUser.IsAdmin));

            ValidateAssessmentStatus(existingAssessment, status);

            if (existingAssessment.Status == status)
            {
                return;
            }

            existingAssessment.Status = status;
            _context.SaveChanges();
        }

        public async Task<AnsweredQuestionResponseV1> AnswerQuestionAsyncV1(UserModel currentUser,
                                                                            int questionnaireId,
                                                                            int questionId,
                                                                            IQuestionAnswerRequest questionAnswerRequest,
                                                                            AnswerTypeEnum answerType = AnswerTypeEnum.AnswerQuestion)
        {
            Log.Information($"Inside AnswerQuestionAsyncV1 => questionnaireId => {questionnaireId}, questionId => {questionId}");

            var existingQuestion = _context.QuestionnaireQuestion
                                           .Include("Questionnaire")
                                           .Include("QuestionnaireTemplateQuestion")
                                           .FirstOrDefault(a => a.Id == questionId
                                                                && a.Questionnaire.Id == questionnaireId
                                                                && (a.Questionnaire.UserId == currentUser.Id || currentUser.IsAdmin));

            if (existingQuestion == null)
            {
                throw new ServiceValidationException("You don't have access to answer question");
            }

            if (existingQuestion.Questionnaire == null
                || existingQuestion.Questionnaire.Status == (int)AssessmentStatusEnum.Cancelled
                || existingQuestion.Questionnaire.Status == (int)AssessmentStatusEnum.Completed)
            {
                throw new ServiceValidationException("Can't answer question during assessment status is one of these statuses (Completed, Cancelled)");
            }
            else if (existingQuestion.Questionnaire != null && existingQuestion.Questionnaire.Status == (int)AssessmentStatusEnum.Open)
            {
                UpdateAssessmentStatus(currentUser, questionnaireId, (int)AssessmentStatusEnum.InProgress);
            }

            var response = new AnsweredQuestionResponseV1();

            var LoadedAssessmentQuestion = LoadAssessmentQuestion(currentUser, existingQuestion.Questionnaire, false, new List<int> { questionId }).FirstOrDefault();

            switch (answerType)
            {
                case AnswerTypeEnum.AnswerQuestion:
                    LoadedAssessmentQuestion.AnswerQuestion(currentUser, questionAnswerRequest, existingQuestion, _context, _mapper, questionId);
                    break;
                case AnswerTypeEnum.AnswerQuestionAdditionalInfo:
                    LoadedAssessmentQuestion.UpdateAdditionalInfo(currentUser, questionAnswerRequest, existingQuestion, _context);
                    break;
                case AnswerTypeEnum.AddQuestionAttachment:
                    LoadedAssessmentQuestion.AddQuestionAttachment(currentUser, questionAnswerRequest, existingQuestion, _context, _mapper);
                    QuestionAttachmentAnswer assessmentQuestionAttachmentAnswer = (QuestionAttachmentAnswer)questionAnswerRequest;
                    response = new AddedAttachmentResponse()
                    {
                        AttachmentIds = existingQuestion.QuestionAttachment
                                                        .Select(a => a.Id)
                                                        .TakeLast(assessmentQuestionAttachmentAnswer.QuestionAttachment.Count)
                                                        .ToList(),
                    };
                    break;
            }

            _context.SaveChanges();

            if (existingQuestion.Status == (int)QuestionStatusEnum.Open && existingQuestion.Questionnaire.Status == (int)AssessmentStatusEnum.InReview)
            {
                UpdateAssessmentStatus(currentUser, questionnaireId, (int)AssessmentStatusEnum.InProgress);
            }
            else if ((int)AssessmentStatusEnum.InReview != existingQuestion.Questionnaire.Status && IsAllAssessmentQuestionsAnswered(questionnaireId))
            {
                UpdateAssessmentStatus(currentUser, questionnaireId, (int)AssessmentStatusEnum.InReview);
            }

            response.QuestionStatus = (QuestionStatusEnum)existingQuestion.Status;
            Log.Information($"Finish AnswerQuestionAsyncV1 => questionnaireId => {questionnaireId}, questionId => {questionId}");
            return response;
        }


        private void ValidateAssessmentStatus(Questionnaire existingAssessment, int status)
        {
            if (existingAssessment == null)
            {
                throw new ServiceValidationException("Assessment not found");
            }

            if (existingAssessment.Status == (int)AssessmentStatusEnum.Cancelled || existingAssessment.Status == (int)AssessmentStatusEnum.Completed)
            {
                throw new ServiceValidationException("Can't update assessment when its status is completed or cancelled");
            }
            else if (existingAssessment.Status == (int)AssessmentStatusEnum.InProgress && status == (int)AssessmentStatusEnum.Open)
            {
                throw new ServiceValidationException(600, "Can't update assessment status cause already in progress status");
            }
            else if (existingAssessment.Status == (int)AssessmentStatusEnum.InProgress && (status == (int)AssessmentStatusEnum.Completed))
            {
                throw new ServiceValidationException("Can't update assessment status when in progress status to be completed");
            }
            else if (existingAssessment.Status == (int)AssessmentStatusEnum.Open && status == (int)AssessmentStatusEnum.Completed)
            {
                throw new ServiceValidationException("Can't update assessment status when in pending/open status to be completed");
            }
        }

        private bool IsAllAssessmentQuestionsAnswered(int assessmentId)
        {
            return _context.QuestionnaireQuestion.Where(q => q.QuestionnaireId == assessmentId
                                                          && !q.QuestionnaireTemplateQuesion.IsOptional)
                                              .All(a => a.Status == (int)QuestionStatusEnum.Answered
                                                         || a.Status == (int)QuestionStatusEnum.Released);
        }

        private List<BaseQuestionType> LoadAssessmentQuestion(UserModel currentUser,
                                                              Questionnaire assessment,
                                                              bool isReadOnly,
                                                              List<int> assessmentQuestionsIds)
        {
            var assessmentQuestions = _context.QuestionnaireQuestion
                                             .Include("QuestionnaireAnswerChoice")
                                             .Include("QuestionnaireAnswerText")
                                             .Include("QuestionAttachment")
                                             .Where(a => a.QuestionnaireId == assessment.Id
                                                         && assessmentQuestionsIds.Contains(a.Id))
                                             .ToList();

            if (assessmentQuestions == null)
            {
                throw new ServiceValidationException("Question not found, or you not have a permissions");
            }

            var assessmentTemplateQuestionsIds = assessmentQuestions.Select(a => a.TemplateQuestionId).ToList();

            var assessmentTemplateQuestion = _context.QuestionnaireTemplateQuestion
                                                     .Include("QuestionChoices")
                                                     .Include("QuestionnaireTemplate")
                                                     .Include("QuestionnaireGroupTemplateQuestion")
                                                     .Where(a => assessmentTemplateQuestionsIds.Contains(a.Id))
                                                     .ToList()
                                                     .ToDictionary(x => x.Id, v => v);

            return _helperManager.ManipulateQuestionByTypeV1(currentUser,
                                                             assessmentQuestions,
                                                             assessmentTemplateQuestion,
                                                             assessmentQuestionsIds,
                                                             assessmentTemplateQuestionsIds, 
                                                             isReadOnly);
        }

    }
}
