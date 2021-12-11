using LifeGuideProject.API.DATA.DatabaseContext;
using LifeGuideProject.API.DATA.Enums;
using LifeGuideProject.API.DTO;
using LifeGuideProject.API.ENTITY;
using LifeGuideProject.API.ENTITY.Entities;
using LifeGuideProject.API.ENTITY.ViewModels.UserViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
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
        private readonly JWTConfig _jWTConfig;
        public UserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ILogger<UserController> logger, IOptions<JWTConfig> jwtConfig)
        { 
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
            _jWTConfig = jwtConfig.Value;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet, Route("Users")]
        public async Task<object> GetUsers()
        {
            try
            {
                var users = _userManager.Users.Select(x => new UserDTO(x.FullName,x.Email, x.UserName));
                return await Task.FromResult(new ResponseModel(ResponseCode.OK, "", users));

            }
            catch (Exception ex)
            {
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, ex.Message, null));
            }

        }


        [HttpPost, Route("Register")]
        public async Task<object> Register(UserRegisterVM pUserRegisterVM)
        {
            try
            {
                var newUser = new ApplicationUser()
                {
                    UserName = pUserRegisterVM.Email,
                    Email = pUserRegisterVM.Email,
                    FullName = pUserRegisterVM.FullName
                };
                var user = _userManager.Users.Where(x => x.Email.Equals(pUserRegisterVM.Email)).FirstOrDefault(); 
                if(user != null)
                {
                    return await Task.FromResult(new ResponseModel(ResponseCode.Error,"Bu email daha önce kullanılmış!",null));
                }
                var result = await _userManager.CreateAsync(newUser, pUserRegisterVM.Password);
                if (result.Succeeded)
                {
                    return await Task.FromResult(new ResponseModel(ResponseCode.OK, "Başarıyla kayıt oldunuz!", null));
                }
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, "", result.Errors.Select(x => x.Description).ToArray()));
            }
            catch (Exception ex)
            {
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, ex.Message, null));
            }
            
        }

        [HttpPost,Route("Login")]
        public async Task<object> Login(UserLoginVM pUserLoginVM)
        {
            try
            {
                if(ModelState.IsValid)
                {
                    var tempUser = _userManager.Users.Where(x => x.Email.Equals(pUserLoginVM.Email)).FirstOrDefault();
                    var result = await _signInManager.PasswordSignInAsync(tempUser.UserName, pUserLoginVM.Password, false, false);
                    if (result.Succeeded)
                    {
                        var appUser = await _userManager.FindByEmailAsync(pUserLoginVM.Email);
                        var user = new UserDTO(appUser.FullName, appUser.Email, appUser.UserName);
                        user.Token = GenerateToken(appUser);
                        return await Task.FromResult(new ResponseModel(ResponseCode.OK, "", user));
                    }
                }
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, "Email veya şifreyi hatalı girdiniz!", null));
            }
            catch (Exception ex)
            {
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, ex.Message, null));
            }
        }

        private string GenerateToken(ApplicationUser user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jWTConfig.Key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new System.Security.Claims.ClaimsIdentity(new[]
                {
                    new System.Security.Claims.Claim(JwtRegisteredClaimNames.NameId, user.Id),
                    new System.Security.Claims.Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new System.Security.Claims.Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(12),
                SigningCredentials= new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Audience= _jWTConfig.Audience,
                Issuer= _jWTConfig.Issuer

            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

    }
}
