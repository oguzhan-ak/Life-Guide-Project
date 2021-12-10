using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LifeGuideProject.API.ENTITY.ViewModels.UserViewModels
{
    public class UserRegisterVM
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
    }
}
