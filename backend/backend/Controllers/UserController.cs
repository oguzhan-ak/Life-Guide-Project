using LifeGuideProject.API.DATA.DatabaseContext;
using LifeGuideProject.API.DTO;
using LifeGuideProject.API.ENTITY.Entities;
using LifeGuideProject.API.ENTITY.ViewModels.UserViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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
    [Route("api/Auth")]
    public class UserController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger<UserController> _logger;
        public UserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ILogger<UserController> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
        }


        [HttpGet, Route("Users")]
        public async Task<object> GetUsers()
        {
            try
            {
                var users = _userManager.Users.Select(x => new UserDTO(x.FullName,x.Email, x.UserName));
                return await Task.FromResult(users);
            }
            catch (Exception ex)
            {
                return await Task.FromResult(ex.Message);
            }
            
        }


        [HttpPost, Route("Register")]
        public async Task<object> Register(UserRegisterVM pUserRegisterVM)
        {
            try
            {
                var newUser = new ApplicationUser()
                {
                    UserName = pUserRegisterVM.UserName,
                    Email = pUserRegisterVM.Email,
                    FullName = pUserRegisterVM.FullName
                };
                var user = _userManager.Users.Where(x => x.Email.Equals(pUserRegisterVM.Email)).FirstOrDefault(); 
                if(user != null)
                {
                    return await Task.FromResult("Bu email daha önce kullanılmış!");
                }
                var result = await _userManager.CreateAsync(newUser, pUserRegisterVM.Password);
                if (result.Succeeded)
                {
                    return await Task.FromResult("Başarıyla kayıt oldunuz!");
                }
                return await Task.FromResult(string.Join(",",result.Errors.Select(x => x.Description).ToArray()));
            }
            catch (Exception ex)
            {
                return await Task.FromResult(ex.Message);
            }
            
        }

        [HttpPost,Route("Login")]
        public async Task<object> Login(UserLoginVM pUserLoginVM)
        {
            try
            {
                if(pUserLoginVM.Email =="")
                {
                    return await Task.FromResult("E-maili boş girdiniz!");
                }else if (pUserLoginVM.Password == "")
                {
                    return await Task.FromResult("Şifreyi boş girdiniz!");
                }
                var user = _userManager.Users.Where(x => x.Email.Equals(pUserLoginVM.Email)).FirstOrDefault();
                var result = await _signInManager.PasswordSignInAsync(user.UserName, pUserLoginVM.Password, false, false);
                if (result.Succeeded)
                {
                    return await Task.FromResult("Başarıyla giriş yaptınız!");
                }
                return await Task.FromResult("Email veya şifreyi hatalı girdiniz!");
            }
            catch (Exception ex)
            {
                return await Task.FromResult(ex.Message);
            }
        }

    }
}
