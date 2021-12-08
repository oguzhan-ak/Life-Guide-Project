using LifeGuideProject.API.DATA.DatabaseContext;
using LifeGuideProject.API.DATA.Entities.User;
using LifeGuideProject.API.ENTITY.ViewModels.UserViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LifeGuideProject.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {

        private readonly LifeGuideDbContext Context;
        private readonly ILogger<UserController> _logger;
        public UserController(ILogger<UserController> logger, LifeGuideDbContext _Context)
        {
            _logger = logger;
            Context = _Context;
        }


        [HttpGet]
        public JsonResult GetUsers()
        {
            var users = Context.Users.ToList<User>();
            return Json(users);
        }
        [HttpPost]
        public JsonResult Register(UserRegisterVM pUserRegisterVM)
        {
            var user = Context.Users.ToList<User>().Where(user => user.UserEmail.Equals(pUserRegisterVM.UserEmail)).FirstOrDefault();
            if (user != null)
                return Json("Bu e-mail adresi ile bir kayıt zaten var.");
            var newUser = new User();
            newUser.UserEmail = pUserRegisterVM.UserEmail;
            newUser.UserName = pUserRegisterVM.UserName;
            newUser.UserPassword = pUserRegisterVM.UserPassword;
            Context.Users.Add(newUser);
            Context.SaveChanges();
            return Json("Ok");
        }

        //[HttpGet]
        //public JsonResult Login(UserLoginVM pUserLoginVM)
        //{
        //    var user = Context.Users.ToList<User>().Where(user => user.UserEmail.Equals(pUserLoginVM.UserEmail) && user.UserPassword.Equals(pUserLoginVM.UserPassword)).FirstOrDefault();
        //    if (user != null)
        //    {
        //        return Json(user);
        //    }
        //    return Json("E-mail veya şifre hatalı.");
        //}

    }
}
