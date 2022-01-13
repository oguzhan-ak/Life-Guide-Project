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
        private RoleManager<IdentityRole> _roleManager;
        private readonly ILogger<UserController> _logger;
        private readonly JWTConfig _jWTConfig;
        public UserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ILogger<UserController> logger, IOptions<JWTConfig> jwtConfig
                              , RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
            _jWTConfig = jwtConfig.Value;
            _roleManager = roleManager;
        }

        [Authorize(Roles ="Admin")]
        [HttpGet, Route("GetUsers")]
        public async Task<object> GetUsers()
        {
            try
            {
                List<UserDTO> allUserDTO = new List<UserDTO>();
                var users = _userManager.Users.ToList();
                foreach (var user in users)
                {
                    var role = (await _userManager.GetRolesAsync(user)).FirstOrDefault();
                    allUserDTO.Add(new UserDTO(user.FullName, user.Email, user.UserName, role,user.IsFormDone));
                }
                return await Task.FromResult(new ResponseModel(ResponseCode.OK, "", allUserDTO));

            }
            catch (Exception ex)
            {
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, ex.Message, null));
            }

        }

        [Authorize(Roles ="Patient")]
        [HttpGet, Route("GetUserList")]
        public async Task<object> GetUserList()
        {
            try
            {
                List<UserDTO> allUserDTO = new List<UserDTO>();
                var users = _userManager.Users.ToList();
                foreach (var user in users)
                {
                    var role = (await _userManager.GetRolesAsync(user)).FirstOrDefault();
                    if (role == "Patient" || role == "Doctor")
                    {
                        allUserDTO.Add(new UserDTO(user.FullName, user.Email, user.UserName, role, user.IsFormDone));
                    }
                }
                return await Task.FromResult(new ResponseModel(ResponseCode.OK, "", allUserDTO));

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
                if (!await _roleManager.RoleExistsAsync(pUserRegisterVM.Role))
                {
                    return await Task.FromResult(new ResponseModel(ResponseCode.Error, "Rol bulunmuyor!", null));
                }
                var newUser = new ApplicationUser()
                {
                    UserName = pUserRegisterVM.Email,
                    Email = pUserRegisterVM.Email,
                    IsFormDone = false
                };
                var user = _userManager.Users.Where(x => x.Email.Equals(pUserRegisterVM.Email)).FirstOrDefault();
                if (user != null)
                {
                    return await Task.FromResult(new ResponseModel(ResponseCode.Error, "Bu email daha önce kullanılmış!", null));
                }
                var result = await _userManager.CreateAsync(newUser, pUserRegisterVM.Password);
                if (result.Succeeded)
                {
                    var tempUser = await _userManager.FindByNameAsync(pUserRegisterVM.Email);
                    await _userManager.AddToRoleAsync(tempUser, pUserRegisterVM.Role);
                    return await Task.FromResult(new ResponseModel(ResponseCode.OK, "Başarıyla kayıt oldunuz!", null));
                }
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, "", result.Errors.Select(x => x.Description).ToArray()));
            }
            catch (Exception ex)
            {
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, ex.Message, null));
            }

        }

        [HttpPost, Route("Login")]
        public async Task<object> Login(UserLoginVM pUserLoginVM)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var tempUser = _userManager.Users.Where(x => x.Email.Equals(pUserLoginVM.Email)).FirstOrDefault();
                    if(tempUser == null)
                    {
                        return await Task.FromResult(new ResponseModel(ResponseCode.Error, "Email veya şifreyi hatalı girdiniz!", null));
                    }
                    var result = await _signInManager.PasswordSignInAsync(tempUser.UserName, pUserLoginVM.Password, false, false);
                    if (result.Succeeded)
                    {
                        var appUser = await _userManager.FindByEmailAsync(pUserLoginVM.Email);
                        var role = (await _userManager.GetRolesAsync(appUser)).FirstOrDefault();
                        var user = new UserDTO(appUser.FullName, appUser.Email, appUser.UserName, role,appUser.IsFormDone);
                        user.Token = GenerateToken(appUser, role);
                        return await Task.FromResult(new ResponseModel(ResponseCode.OK, "Başarıyla giriş yaptınız.", user));
                    }
                }
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, "Email veya şifreyi hatalı girdiniz!", null));
            }
            catch (Exception ex)
            {
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, ex.Message, null));
            }
        }

        private string GenerateToken(ApplicationUser user, string role)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jWTConfig.Key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new System.Security.Claims.ClaimsIdentity(new[]
                {
                    new Claim(JwtRegisteredClaimNames.NameId, user.Id),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Role, role)

                }),
                Expires = DateTime.UtcNow.AddHours(12),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Audience = _jWTConfig.Audience,
                Issuer = _jWTConfig.Issuer

            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        [Authorize(Roles ="Admin")]
        [HttpPost,Route("AddRole")]
        public async Task<object> AddRole(UserAddRoleVM pUserAddRoleVM)
        {
            try
            {
                if(pUserAddRoleVM==null || pUserAddRoleVM.Role == "")
                {
                    return await Task.FromResult(new ResponseModel(ResponseCode.Error, "Parametreler eksik!", null));
                }
                if(await _roleManager.RoleExistsAsync(pUserAddRoleVM.Role))
                {
                    return await Task.FromResult(new ResponseModel(ResponseCode.OK, "Rol zaten var!", null));
                }

                var role = new IdentityRole();
                role.Name= pUserAddRoleVM.Role;
                var result = await _roleManager.CreateAsync(role);
                if (result.Succeeded)
                {
                    return await Task.FromResult(new ResponseModel(ResponseCode.OK, "Rol başarıyla eklendi!", null));
                }
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, "Rol eklenirken hatayla karşılaşıldı. Tekrar deneyiniz!", null));
            }
            catch (Exception ex)
            {
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, ex.Message, null));
            }
        }

        [HttpGet,Route("GetRoles")]
        public async Task<object> GetRoles()
        {
            try
            {
                var roles = _roleManager.Roles.Select(x => x.Name).ToList();
                return await Task.FromResult(new ResponseModel(ResponseCode.OK,"",roles));
            }
            catch (Exception ex)
            {
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, ex.Message, null));
            }
        }
    }
}
