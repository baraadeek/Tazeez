using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Tazeez.Enums;

namespace Tazeez.ModelViews.Request
{
    public class QuestionnaireTemplateQuestionRequestModel
    {
        public QuestionnaireTemplateQuestionRequestModel()
        {
            QuestionChoices = new List<QuestionChoiceRequestModel>();
        }

        public int Id { get; set; }

        [Required]
        public string Question { get; set; }

        [Required]
        [DefaultValue(QuestionTypeEnum.OpenEnded)]
        [EnumDataType(typeof(QuestionTypeEnum))]
        public QuestionTypeEnum QuestionnaireQuestionTypeId { get; set; }

        public int DisplayOrder { get; set; }

        public int Score { get; set; }

        [DefaultValue(false)]
        public bool IsOptional { get; set; }

        public List<QuestionChoiceRequestModel> QuestionChoices { get; set; }
    }
}
