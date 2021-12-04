using LifeGuideProject.API.DATA.DatabaseContext;
using LifeGuideProject.API.DATA.Entities.User;
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

    }
}
