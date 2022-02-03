using Tazeez.Common.Extensions;
using Tazeez.DataAccess.Models;
using Tazeez.DB.Models.DB;
using Tazeez.Models;
using Tazeez.Models.QuestionTypes;
using Tazeez.Models.Responses;
using Tazeez.Models.Responses.QuestionsPaginationResponse;
using Tazeez.ModelViews;
using Tazeez.ModelViews.ModelViews;
using Tazeez.ModelViews.Response;

namespace Tazeez.Core.Mapper
{
    public class Mapping : AutoMapper.Profile
    {
        public Mapping()
        {
            CreateMap<PagedResult<Doctor>, PagedResult<DoctorModel>>().ReverseMap();
            CreateMap<PagedResult<User>, PagedResult<SearchUserModel>>().ReverseMap();
            CreateMap<PagedResult<User>, PagedResult<ChildrenResponse>>().ReverseMap();
            CreateMap<PagedResult<ContactResponseModel>, PagedResult<ContactRequest>>().ReverseMap();

            CreateMap<QuestionnaireGroupTemplateQuestion, QuestionnaireGroupTemplateQuestionModel>().ReverseMap();
            CreateMap<TemplateGroupScore, TemplateGroupScoreModel>().ReverseMap();
            CreateMap<Doctor, DoctorModel>().ReverseMap();
            CreateMap<User, UserModel>().ReverseMap();
            CreateMap<User, ChildrenResponse>().ReverseMap();
            CreateMap<User, SearchUserModel>().ReverseMap();
            CreateMap<User, LoginResponse>().ReverseMap();
            CreateMap<QuestionnaireTemplate, QuestionnaireTemplateModel>().ReverseMap();
            CreateMap<QuestionnaireGroup, QuestionnaireGroupModel>().ReverseMap();
            CreateMap<Questionnaire, QuestionnaireModel>().ReverseMap();
            CreateMap<QuestionnaireQuestion, QuestionnaireQuestionModel>().ReverseMap();
            CreateMap<QuestionnaireTemplateQuestion, QuestionnaireTemplateQuestionModel>().ReverseMap();
            CreateMap<QuestionChoice, QuestionChoiceModel>().ReverseMap();
            CreateMap<QuestionnaireGroupTemplateQuestionResponse, QuestionnaireGroupTemplateQuestion>().ReverseMap();

            CreateMap<ContactResponseModel, ContactRequest>().ReverseMap();

            CreateMap<QuestionAttachment, AttachmentModel>().ForMember(model => model.SourceId, m => m.MapFrom(e => e.QuestionId));
            CreateMap<QuestionAttachment, QuestionAttachmentModel>().ReverseMap();
            CreateMap<QuestionChoiceResponse, QuestionChoiceModel>().ReverseMap();
            
            CreateMap<BaseQuestionType, BaseQuestionTypeResponse>().ReverseMap();
            CreateMap<NumberAnswer, BaseQuestionTypeResponse>().IncludeBase<BaseQuestionType, BaseQuestionTypeResponse>();
            CreateMap<OpenEndedAnswer, BaseQuestionTypeResponse>().IncludeBase<BaseQuestionType, BaseQuestionTypeResponse>();
            CreateMap<DateTimeAnswer, BaseQuestionTypeResponse>().IncludeBase<BaseQuestionType, BaseQuestionTypeResponse>();
            CreateMap<MultipleChoiceMultipleAnswer, BaseQuestionTypeResponse>().IncludeBase<BaseQuestionType, BaseQuestionTypeResponse>();
            CreateMap<MultipleChoiceSingleAnswer, BaseQuestionTypeResponse>().IncludeBase<BaseQuestionType, BaseQuestionTypeResponse>();
            CreateMap<AttachmentOnlyAnswer, BaseQuestionTypeResponse>().IncludeBase<BaseQuestionType, BaseQuestionTypeResponse>();
            CreateMap<PagedResult<BaseQuestionType>, PagedResult<BaseQuestionTypeResponse>>().ReverseMap();
        }
    }
}
