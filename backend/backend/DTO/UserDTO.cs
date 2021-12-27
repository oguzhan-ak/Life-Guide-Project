﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LifeGuideProject.API.DTO
{
    public class UserDTO
    {
        public UserDTO(string fullName, string email, string userName, string role,bool isFormDone)
        {
            FullName = fullName;
            Email = email;
            UserName = userName;
            Role = role;
            IsFormDone = isFormDone;
        }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Token { get; set; }
        public string Role { get; set; }
        public bool IsFormDone { get; set; }
    }
}
