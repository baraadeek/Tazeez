﻿using System;

namespace Tazeez.ModelViews.Response
{
    public class QuestionnaireTemplateResponseModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime CreatedDate { get; set; }

        public int NumberOfQuestions { get; set; }
    }
}
