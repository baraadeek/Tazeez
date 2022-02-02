using System;
using System.ComponentModel.DataAnnotations;

namespace Tazeez.ModelViews.Request
{
    public class AddChildrenRequest
    {
        public int Id { get; set; }

        public string FirstName { get; set; }
        
        public string LastName { get; set; }

        [Required(ErrorMessage = "BirthDay for children is Required")]
        public DateTime BirthDay { get; set; }

        public string Image { get; set; }
        
        public bool Gender { get; set; }
    }
}
