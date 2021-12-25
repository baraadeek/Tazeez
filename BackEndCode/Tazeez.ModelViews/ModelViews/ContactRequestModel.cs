using System;

namespace Tazeez.ModelViews.ModelViews
{
    public class ContactRequestModel
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Message { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public bool Archived { get; set; }
    }
}
