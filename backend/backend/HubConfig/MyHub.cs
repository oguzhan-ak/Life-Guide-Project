using LifeGuideProject.API.DATA.DatabaseContext;
using LifeGuideProject.API.DTO;
using LifeGuideProject.API.ENTITY.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace LifeGuideProject.API.HubConfig
{
    public class MyHub : Hub
    {
        LifeGuideDbContext db;
        private UserManager<ApplicationUser> _userManager;

        public MyHub(LifeGuideDbContext db, UserManager<ApplicationUser> userManager)
        {
            this.db = db;
            _userManager = userManager;
        }

        public async Task authMe(UserEmailInputDto userEmailInputDto)
        {
            string currentSignalrID = Context.ConnectionId;
            var User = _userManager.Users.Where(x => x.Email.Equals(userEmailInputDto.userEmail)).FirstOrDefault();
            if (User != null)
            {
                Console.WriteLine("\n" + User.Email + " logged in " + "\nSignalrID: " + currentSignalrID);

                Connection connection = new Connection(User.Email, currentSignalrID, DateTime.Now);
                await db.connections.AddAsync(connection);
                db.SaveChanges();
                await Clients.Caller.SendAsync("authMeResponseSuccess", User);
            }
            else
            {
                await Clients.Caller.SendAsync("authMeResponseFail");
            }


        }
    }
}
