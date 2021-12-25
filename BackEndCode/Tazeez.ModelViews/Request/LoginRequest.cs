using System.ComponentModel.DataAnnotations;

namespace Tazeez.ModelViews.Request
{
    public class LoginRequest
    {
        [Required(ErrorMessage = "Email can't be empty")]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password can't be empty")]
        public string Password { get; set; }
    }
}
