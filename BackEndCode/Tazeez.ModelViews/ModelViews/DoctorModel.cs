using System;

namespace Tazeez.ModelViews.ModelViews
{
    public class DoctorModel
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public string Specialist { get; set; }

        public string Description { get; set; }

        public DateTime CreatedUTC { get; set; }

        public DateTime LastUpdatedUTC { get; set; }

        public bool Archived { get; set; }

        public UserModel User { get; set; }

    }
}
