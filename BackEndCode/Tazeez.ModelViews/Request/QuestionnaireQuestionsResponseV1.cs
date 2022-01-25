using System.Collections.Generic;
using Tazeez.Common.Extensions;
using Tazeez.Models.Responses.QuestionsPaginationResponse;
using Tazeez.ModelViews.Response;

namespace Tazeez.Models.Responses
{
    public class QuestionnaireQuestionsResponseV1
    {
        public QuestionnaireQuestionsResponseV1()
        {
            AssignedUsers = new Dictionary<int, SearchUserModel>();
        }

        public PagedResult<BaseQuestionTypeResponse> Questions { get; set; }

        public Dictionary<int, SearchUserModel> AssignedUsers { get; set; }

        public int? OwnerId { get; set; }

        public int QuestionnaireTemplate { get; set; }

        public string QuestionnaireTitle { get; set; }

        public string QuestionnaireTemplateName { get; set; }
    }
}
