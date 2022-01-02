using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Tazeez.Enums;

namespace Tazeez.ModelViews.ModelViews
{
    public class QuestionnaireTemplateQuestionModel
    {
        public QuestionnaireTemplateQuestionModel()
        {
            QuestionnaireQuestions = new List<QuestionnaireQuestionModel>();
        }

        public int Id { get; set; }

        [Required]
        public string Question { get; set; }

        public int QuestionnaireTemplateId { get; set; }

        [Required]
        [DefaultValue(QuestionTypeEnum.OpenEnded)]
        [EnumDataType(typeof(QuestionTypeEnum))]
        public QuestionTypeEnum QuestionnaireQuestionTypeId { get; set; }

        public int DisplayOrder { get; set; }

        public int Score { get; set; }

        [DefaultValue(false)]
        public bool IsOptional { get; set; }

        public DateTime CreatedUTC { get; set; }

        public DateTime LastUpdatedUTC { get; set; }

        [DefaultValue(false)]
        public bool Archived { get; set; }

        public virtual QuestionnaireTemplateModel QuestionnaireTemplate { get; set; }

        public List<QuestionnaireQuestionModel> QuestionnaireQuestions { get; set; }
    }
}
