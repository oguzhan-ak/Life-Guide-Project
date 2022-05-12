using Microsoft.AspNetCore.SignalR;

namespace LifeGuideProject.API.HubConfig
{
    public class ChatHub : Hub
    {
        //public Task SendMessage1(string userEmail, string message)               // Two parameters accepted
        //{
        //    return Clients.All.SendAsync("ReceiveOne", userEmail, message);    // Note this 'ReceiveOne' 
        //}
    }
}
