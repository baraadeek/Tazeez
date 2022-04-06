﻿using System;
using System.Collections.Generic;

namespace Tazeez.DB.Models.DB
{
    public class QuestionnaireTemplate
    {
        public QuestionnaireTemplate()
        {
            QuestionnaireTemplateQuestions = new HashSet<QuestionnaireTemplateQuestion>();
            Questionnaires = new HashSet<Questionnaire>();
            QuestionnaireGroupTemplateQuestions = new HashSet<QuestionnaireGroupTemplateQuestion>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime CreatedUTC { get; set; }
        
        public DateTime LastUpdatedUTC { get; set; }

        public bool Archived { get; set; }

        public virtual ICollection<QuestionnaireTemplateQuestion> QuestionnaireTemplateQuestions { get; set; }
        
        public virtual ICollection<QuestionnaireGroupTemplateQuestion> QuestionnaireGroupTemplateQuestions { get; set; }

        public virtual ICollection<Questionnaire> Questionnaires { get; set; }
    }
}