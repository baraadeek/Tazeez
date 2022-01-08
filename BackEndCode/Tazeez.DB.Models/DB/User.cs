using System;
using System.Collections.Generic;

namespace Tazeez.DB.Models.DB
{
    public partial class User
    {
        public User()
        {
            QuestionnaireAnswerText = new List<QuestionnaireAnswerText>();
            QuestionnaireAnswerChoice = new List<QuestionnaireAnswerChoice>();
        }

        public int Id { get; set; }
        
        public string FirstName { get; set; }
        
        public string LastName { get; set; }
        
        public string Email { get; set; }
        
        public string Password { get; set; }
        
        public string PhoneNumber { get; set; }
        
        public string City { get; set; }
        
        public string Image { get; set; }
        
        public bool IsAdmin { get; set; }
        
        public DateTime CreatedDate { get; set; }
        
        public DateTime UpdateDate { get; set; }
        
        public bool Archived { get; set; }

        public List<QuestionnaireAnswerText> QuestionnaireAnswerText { get; set; }

        public List<QuestionnaireAnswerChoice> QuestionnaireAnswerChoice { get; set; }
    }
}