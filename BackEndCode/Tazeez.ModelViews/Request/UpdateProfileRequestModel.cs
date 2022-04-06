﻿using System;

namespace Tazeez.ModelViews.Request
{
    public class UpdateProfileRequestModel
    {
        public string FirstName { get; set; }
        
        public string LastName { get; set; }

        public string Image { get; set; }

        public string City { get; set; }

        public string PhoneNumber { get; set; }

        public DateTime BirthDay { get; set; }

        public bool Gender { get; set; }
    }
}
