using System;

namespace Tazeez.ModelViews.Response
{
    public class ChildrenResponse
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime BirthDay { get; set; }

        public string FullName => $"{FirstName} {LastName}";
    }
}
