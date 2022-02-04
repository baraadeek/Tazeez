using System.ComponentModel.DataAnnotations;

namespace Tazeez.ModelViews.ModelViews
{
    public class ContactUsRequestModel
    {
        public int Id { get; set; }
        
        [Required]
        public string UserName { get; set; }
        
        public string Email { get; set; }
        
        public string PhoneNumber { get; set; }
        
        public string Message { get; set; }
    }
}
