namespace Tazeez.ModelViews.Response
{
    public class SearchUserModel
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string FullName => $"{FirstName} {LastName}";

        public string Email { get; set; }

        public string Image { get; set; }

        public bool? Gender { get; set; }
    }
}
