using Tazeez.Common.Extensions;
using Tazeez.DataAccess.Models;
using Tazeez.DB.Models.DB;
using Tazeez.Models;
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
            CreateMap<Doctor, DoctorModel>().ReverseMap();
            CreateMap<User, UserModel>().ReverseMap();
            CreateMap<User, SearchUserModel>().ReverseMap();
            CreateMap<User, LoginResponse>().ReverseMap();
            CreateMap<ContactRequest, ContactRequestModel>().ReverseMap();
            CreateMap<QuestionnaireTemplate, QuestionnaireTemplateModel>().ReverseMap();
            CreateMap<QuestionnaireGroup, QuestionnaireGroupModel>().ReverseMap();
            CreateMap<Questionnaire, QuestionnaireModel>().ReverseMap();
            CreateMap<QuestionnaireQuestion, QuestionnaireQuestionModel>().ReverseMap();
            CreateMap<QuestionnaireTemplateQuestion, QuestionnaireTemplateQuestionModel>().ReverseMap();
            CreateMap<QuestionChoice, QuestionChoiceModel>().ReverseMap();

            CreateMap<QuestionAttachment, AttachmentModel>().ForMember(model => model.SourceId, m => m.MapFrom(e => e.QuestionId));
            CreateMap<QuestionAttachment, QuestionAttachmentModel>().ReverseMap();

        }
    }
}
