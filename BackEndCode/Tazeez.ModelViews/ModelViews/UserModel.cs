using System;
using Tazeez.ModelViews.ModelViews;

namespace Tazeez.ModelViews
{
    public class UserModel
    {
        public int Id { get; set; }
        
        public string FirstName { get; set; }
        
        public string LastName { get; set; }

        public string FullName => $"{FirstName} {LastName}";
        
        public string Email { get; set; }
        
        public string PhoneNumber { get; set; }
        
        public string City { get; set; }
        
        public string Image { get; set; }
        
        public bool IsAdmin { get; set; }

        public bool IsDoctor => Doctor != null;

        public DoctorModel Doctor { get; set; }

        public DateTime CreatedDateUTC { get; set; }
 
        public DateTime LastUpdatedUTC { get; set; }

        public DateTime BirthDay { get; set; }
    }
}