using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LifeGuideProject.API.DTO
{
    public class UserDTO
    {
        public UserDTO(string fullName, string email, string userName)
        {
            FullName = fullName;
            Email = email;
            UserName = userName;
        }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        //public DateTime? UserBirthDate { get; set; }
        //public long? UserAge { get; set; }
        //public double? UserHeight { get; set; }
        //public double? UserWeight { get; set; }
        //public DateTime CreatedTime { get; set; }
        //public DateTime? UpdatedTime { get; set; }
        //public bool IsActive { get; set; }
        //public DateTimeOffset? LockoutEnd { get; set; }
        //public bool TwoFactorEnabled { get; set; }
        //public bool PhoneNumberConfirmed { get; set; }
        //public string PhoneNumber { get; set; }
        //public string ConcurrencyStamp { get; set; }
        //public string SecurityStamp { get; set; }
        //public string PasswordHash { get; set; }
        //public bool EmailConfirmed { get; set; }
        //public string NormalizedEmail { get; set; }
        //public string NormalizedUserName { get; set; }
        //public string Id { get; set; }
        //public bool LockoutEnabled { get; set; }
        //public int AccessFailedCount { get; set; }
    }
}
