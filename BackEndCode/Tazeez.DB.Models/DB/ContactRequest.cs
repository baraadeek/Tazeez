﻿using System;

namespace Tazeez.DB.Models.DB
{
    public class ContactRequest
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Message { get; set; }
        public DateTime CreatedDateUTC { get; set; }
        public DateTime LastUpdatedUTC { get; set; }
        public bool Archived { get; set; }
    }
}