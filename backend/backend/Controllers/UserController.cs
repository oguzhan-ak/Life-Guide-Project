using LifeGuideProject.API.DATA.DatabaseContext;
using LifeGuideProject.API.DATA.Entities.User;
using LifeGuideProject.API.ENTITY.ViewModels.UserViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace LifeGuideProject.API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class UserController : Controller
    {

        private readonly LifeGuideDbContext Context;
        private readonly ILogger<UserController> _logger;
        public UserController(ILogger<UserController> logger, LifeGuideDbContext _Context)
        {
            _logger = logger;
            Context = _Context;
        }


        [HttpGet,Route("users")]
        [Authorize]
        public JsonResult GetUsers()
        {
            var users = Context.Users.ToList<User>();
            return Json(users);
        }
        [HttpPost,Route("register")]
        public JsonResult Register(UserRegisterVM pUserRegisterVM)
        {
            var user = Context.Users.ToList<User>().Where(user => user.UserEmail.Equals(pUserRegisterVM.UserEmail)).FirstOrDefault();
            if (user != null)
                return Json("Nok:Same email");
            var newUser = new User();
            newUser.UserEmail = pUserRegisterVM.UserEmail;
            newUser.UserName = pUserRegisterVM.UserName;
            newUser.UserPassword = pUserRegisterVM.UserPassword;
            Context.Users.Add(newUser);
            Context.SaveChanges();
            return Json("Ok");
        }

        [HttpPost,Route("login")]
        public IActionResult Login(UserLoginVM pUserLoginVM)
        {
            if (pUserLoginVM == null)
                return Json("Nok:Yanlış istek");
            var user = Context.Users.ToList<User>().Where(user => user.UserEmail.Equals(pUserLoginVM.UserEmail) && user.UserPassword.Equals(pUserLoginVM.UserPassword)).FirstOrDefault();
            if (user != null)
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256); /// şifreleme algoritması ile şifrelendi
                var tokenOptions= new JwtSecurityToken(
                    issuer : "https://localhost:5001",
                    audience : "https://localhost:5001",
                    claims : new List<Claim>(),
                    expires : DateTime.Now.AddMinutes(5),
                    signingCredentials : signingCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

                return Json( new { Token = tokenString});
            }
            return Json("Nok:Email veya şifre hatalı");
        }

    }
}
