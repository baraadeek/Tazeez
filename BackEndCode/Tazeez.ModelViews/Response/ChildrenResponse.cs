using System;

namespace Tazeez.ModelViews.Response
{
    public class ChildrenResponse
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string FullName => $"{FirstName} {LastName}";

        public DateTime BirthDay { get; set; }

        public bool? Gender { get; set; }

        public string Image { get; set; }
    }
}
