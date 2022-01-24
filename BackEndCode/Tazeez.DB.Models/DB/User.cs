using System;
using System.Collections.Generic;
using Tazeez.DataAccess.Models;

namespace Tazeez.DB.Models.DB
{
    public partial class User
    {
        public User()
        {
            QuestionnaireAnswerText = new HashSet<QuestionnaireAnswerText>();
            QuestionnaireAnswerChoice = new HashSet<QuestionnaireAnswerChoice>();
            Questionnaires = new HashSet<Questionnaire>();
            QuestionAttachments = new HashSet<QuestionAttachment>();
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

        public virtual Doctor Doctor { get; set; }

        public virtual ICollection<QuestionnaireAnswerText> QuestionnaireAnswerText { get; set; }

        public virtual ICollection<QuestionnaireAnswerChoice> QuestionnaireAnswerChoice { get; set; }

        public virtual ICollection<Questionnaire> Questionnaires { get; set; }

        public virtual ICollection<QuestionAttachment> QuestionAttachments { get; set; }
    }
}