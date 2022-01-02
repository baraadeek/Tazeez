using Tazeez.DB.Models.DB;
using Tazeez.ModelViews;
using Tazeez.ModelViews.ModelViews;
using Tazeez.ModelViews.Response;

namespace Tazeez.Core.Mapper
{
    public class Mapping : AutoMapper.Profile
    {
        public Mapping()
        {
            CreateMap<User, UserModel>().ReverseMap();
            CreateMap<User, LoginResponse>().ReverseMap();
            CreateMap<ContactRequest, ContactRequestModel>().ReverseMap();
            CreateMap<QuestionnaireTemplate, QuestionnaireTemplateModel>().ReverseMap();
            CreateMap<QuestionnaireGroup, QuestionnaireGroupModel>().ReverseMap();
            CreateMap<Questionnaire, QuestionnaireModel>().ReverseMap();
            CreateMap<QuestionnaireQuestion, QuestionnaireQuestionModel>().ReverseMap();
            CreateMap<QuestionnaireTemplateQuestion, QuestionnaireTemplateQuestionModel>().ReverseMap();
        }
    }
}
