using LifeGuideProject.API.DATA.DatabaseContext;
using LifeGuideProject.API.DATA.Enums;
using LifeGuideProject.API.DTO.Chat;
using LifeGuideProject.API.ENTITY;
using LifeGuideProject.API.ENTITY.Entities;
using LifeGuideProject.API.HubConfig;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace LifeGuideProject.API.Controllers
{
    [ApiController]
    [Route("api/Chat")]
    public class ChatController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private readonly IHubContext<ChatHub> _hubContext;
        LifeGuideDbContext db;

        public ChatController(UserManager<ApplicationUser> userManager, IHubContext<ChatHub> hubContext, LifeGuideDbContext db)
        {
            _userManager = userManager;
            _hubContext = hubContext;
            this.db = db;
        }

        [Route("send")]
        [HttpPost]
        public IActionResult SendRequest([FromBody] MessageDTO msg)
        {
            _hubContext.Clients.All.SendAsync("ReceiveOne", msg.senderUserEmail, msg.message, msg.receiverUserEmail, msg.timeStamp, msg.connectionId);
            var message = new Message(msg.senderUserEmail, msg.receiverUserEmail, msg.message, msg.connectionId, msg.timeStamp);
            db.messages.Add(message);
            db.SaveChanges();
            return Ok();
        }
        [Route("getPrivateMessages")]
        [HttpPost]
        public async Task<object> GetPrivateMessages(GetPrivateMessageDTO getPrivateMessageDTO)
        {
            try
            {
                var messages = db.messages
                   .Where(x =>
                        ((x.senderUserEmail == getPrivateMessageDTO.senderUserEmail) || (x.senderUserEmail == getPrivateMessageDTO.receiverUserEmail)) &&
                        ((x.receiverUserEmail == getPrivateMessageDTO.receiverUserEmail) || (x.receiverUserEmail == getPrivateMessageDTO.senderUserEmail)))
                   .OrderBy(x => x.timeStamp).ToList();
                return await Task.FromResult(new ResponseModel(ResponseCode.OK, "", messages));

            }
            catch (Exception ex)
            {
                return await Task.FromResult(new ResponseModel(ResponseCode.Error, ex.Message, null));
            }
        }



    }
}

