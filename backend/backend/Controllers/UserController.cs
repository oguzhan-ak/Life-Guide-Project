﻿using LifeGuideProject.API.DATA.DatabaseContext;
using LifeGuideProject.API.DATA.Enums;
using LifeGuideProject.API.DTO;
using LifeGuideProject.API.ENTITY;
using LifeGuideProject.API.ENTITY.Entities;
using LifeGuideProject.API.ENTITY.ViewModels.UserViewModels;
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
        LifeGuideDbContext db;
        public UserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ILogger<UserController> logger, IOptions<JWTConfig> jwtConfig
                              , RoleManager<IdentityRole> roleManager, LifeGuideDbContext db)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
            _jWTConfig = jwtConfig.Value;
            _roleManager = roleManager;
            this.db = db;
        }

        [Authorize(Roles = "Admin")]
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
                    allUserDTO.Add(new UserDTO(user.FullName, user.Email, user.UserName, role, user.IsFormDone));
                }
                return await Task.FromResult(new ResponseModel(ResponseCode.OK, "", allUserDTO));

            }
            catch (Exception ex)
            {
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, ex.Message, null));
            }

        }
        [HttpPost, Route("GetUser")]
        public async Task<object> GetUser(UserEmailInputDto userEmailInputDto)
        {
            try
            {
                var model = db.firstForms.Where(x => x.userEmail == userEmailInputDto.userEmail).OrderByDescending(x => x.createdTime).FirstOrDefault();

                return await Task.FromResult(new ResponseModel(ResponseCode.OK, "", model));

            }
            catch (Exception ex)
            {
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, ex.Message, null));
            }

        }

        [Authorize(Roles = "Patient")]
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
                    if (tempUser == null)
                    {
                        return await Task.FromResult(new ResponseModel(ResponseCode.Error, "Email veya şifreyi hatalı girdiniz!", null));
                    }
                    var result = await _signInManager.PasswordSignInAsync(tempUser.UserName, pUserLoginVM.Password, false, false);
                    if (result.Succeeded)
                    {
                        var appUser = await _userManager.FindByEmailAsync(pUserLoginVM.Email);
                        var role = (await _userManager.GetRolesAsync(appUser)).FirstOrDefault();
                        var user = new UserDTO(appUser.FullName, appUser.Email, appUser.UserName, role, appUser.IsFormDone);
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

        [Authorize(Roles = "Admin")]
        [HttpPost, Route("AddRole")]
        public async Task<object> AddRole(UserAddRoleVM pUserAddRoleVM)
        {
            try
            {
                if (pUserAddRoleVM == null || pUserAddRoleVM.Role == "")
                {
                    return await Task.FromResult(new ResponseModel(ResponseCode.Error, "Parametreler eksik!", null));
                }
                if (await _roleManager.RoleExistsAsync(pUserAddRoleVM.Role))
                {
                    return await Task.FromResult(new ResponseModel(ResponseCode.OK, "Rol zaten var!", null));
                }

                var role = new IdentityRole();
                role.Name = pUserAddRoleVM.Role;
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

        [HttpGet, Route("GetRoles")]
        public async Task<object> GetRoles()
        {
            try
            {
                var roles = _roleManager.Roles.Select(x => x.Name).ToList();
                return await Task.FromResult(new ResponseModel(ResponseCode.OK, "", roles));
            }
            catch (Exception ex)
            {
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, ex.Message, null));
            }
        }

        [HttpPost, Route("FirstForm")]
        public async Task<object> FirstForm(UserFirstFormVM pUserFirstFormVM)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var user = _userManager.Users.Where(x => x.Email.Equals(pUserFirstFormVM.userEmail)).FirstOrDefault();
                    if (user == null)
                    {
                        return await Task.FromResult(new ResponseModel(ResponseCode.Error, "Lütfen tekrar deneyiniz!", null));
                    }
                    user.IsFormDone = true;
                    var userResult = await _userManager.UpdateAsync(user);
                    UserDTO returnUser = null;
                    if (userResult.Succeeded)
                    {
                        var appUser = await _userManager.FindByEmailAsync(pUserFirstFormVM.userEmail);
                        var role = (await _userManager.GetRolesAsync(appUser)).FirstOrDefault();
                        returnUser = new UserDTO(appUser.FullName, appUser.Email, appUser.UserName, role, appUser.IsFormDone, "");
                    }
                    var firstForm = new FirstForm(pUserFirstFormVM.firstName, pUserFirstFormVM.secondName, pUserFirstFormVM.lastName, pUserFirstFormVM.birthDateYear, pUserFirstFormVM.birthDateMonth
                        , pUserFirstFormVM.birthDateDay, pUserFirstFormVM.weight, pUserFirstFormVM.height, pUserFirstFormVM.gender, pUserFirstFormVM.address, pUserFirstFormVM.city
                        , pUserFirstFormVM.country, pUserFirstFormVM.postCode, pUserFirstFormVM.telephone, pUserFirstFormVM.aboutMeText, pUserFirstFormVM.solver, pUserFirstFormVM.firstQuestion
                        , pUserFirstFormVM.secondQuestion, pUserFirstFormVM.thirdQuestion, pUserFirstFormVM.fourthQuestion, pUserFirstFormVM.fifthQuestion, pUserFirstFormVM.userEmail, DateTime.Now);
                    var Formresult = new Object();
                    try
                    {
                        Formresult = db.firstForms.Add(firstForm);
                        db.SaveChanges();
                    }
                    catch (Exception ex1)
                    {
                        return await Task.FromResult(new ResponseModel(ResponseCode.Error, ex1.Message, null));
                    }

                    return await Task.FromResult(new ResponseModel(ResponseCode.OK, "Başarıyla formu doldurdunuz.", returnUser));
                }
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, "Formu işlerken bir hata ile karşılaşıldı!", null));
            }
            catch (Exception ex2)
            {
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, ex2.Message, null));
            }

        }

        [HttpPost, Route("UpdateUser")]
        public async Task<object> UpdateUser(UserFirstFormVM pUserFirstFormVM)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var user = _userManager.Users.Where(x => x.Email.Equals(pUserFirstFormVM.userEmail)).FirstOrDefault();
                    if (user == null)
                    {
                        return await Task.FromResult(new ResponseModel(ResponseCode.Error, "Lütfen tekrar deneyiniz!", null));
                    }
                    var firstForm = new FirstForm(pUserFirstFormVM.firstName, pUserFirstFormVM.secondName, pUserFirstFormVM.lastName, pUserFirstFormVM.birthDateYear, pUserFirstFormVM.birthDateMonth
                        , pUserFirstFormVM.birthDateDay, pUserFirstFormVM.weight, pUserFirstFormVM.height, pUserFirstFormVM.gender, pUserFirstFormVM.address, pUserFirstFormVM.city
                        , pUserFirstFormVM.country, pUserFirstFormVM.postCode, pUserFirstFormVM.telephone, pUserFirstFormVM.aboutMeText, pUserFirstFormVM.solver, pUserFirstFormVM.firstQuestion
                        , pUserFirstFormVM.secondQuestion, pUserFirstFormVM.thirdQuestion, pUserFirstFormVM.fourthQuestion, pUserFirstFormVM.fifthQuestion, pUserFirstFormVM.userEmail, DateTime.Now);
                    var Formresult = new Object();
                    try
                    {
                        var id = pUserFirstFormVM.id;
                        var form = db.firstForms.Find(id);
                        form.firstName = pUserFirstFormVM.firstName;
                        form.secondName = pUserFirstFormVM.secondName;
                        form.lastName = pUserFirstFormVM.lastName;
                        form.postCode = pUserFirstFormVM.postCode;
                        form.telephone = pUserFirstFormVM.telephone;
                        form.aboutMeText = pUserFirstFormVM.aboutMeText;
                        form.address = pUserFirstFormVM.address;
                        form.city = pUserFirstFormVM.city;
                        form.country = pUserFirstFormVM.country;
                        form.weight = Convert.ToDouble(pUserFirstFormVM.weight);
                        form.height = Convert.ToInt32(pUserFirstFormVM.height);
                        form.createdTime = DateTime.Now;

                        Formresult = db.SaveChanges();
                    }
                    catch (Exception ex1)
                    {
                        return await Task.FromResult(new ResponseModel(ResponseCode.Error, ex1.Message, null));
                    }

                    return await Task.FromResult(new ResponseModel(ResponseCode.OK, "Başarıyla bilgilerinizi güncellediniz.", null));
                }
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, "Bilgilerinizi güncellerken bir hata ile karşılaşıldı!", null));
            }
            catch (Exception ex2)
            {
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, ex2.Message, null));
            }

        }

    }
}
