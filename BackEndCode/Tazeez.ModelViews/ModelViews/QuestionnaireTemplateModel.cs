using System.Collections.Generic;

namespace Tazeez.ModelViews.ModelViews
{
    public class QuestionnaireTemplateModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public List<QuestionnaireGroupTemplateQuestionModel> QuestionnaireGroupTemplateQuestion { get; set; }
    }
}
