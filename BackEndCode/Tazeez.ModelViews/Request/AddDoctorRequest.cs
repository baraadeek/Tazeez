namespace Tazeez.ModelViews.Request
{
    public class AddDoctorRequest
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public string Specialist { get; set; }

        public string Description { get; set; }
    }
}
