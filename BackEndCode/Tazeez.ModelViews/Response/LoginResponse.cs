namespace Tazeez.ModelViews.Response
{
    public class LoginResponse
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Image { get; set; }
        public string Token { get; set; }
        public bool IsAdmin { get; set; }
    }
}
