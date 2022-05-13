using System;

namespace LifeGuideProject.API.DTO.Chat
{
    public class MessageDTO
    {
        public string senderUserEmail { get; set; }
        public string message { get; set; }
        public string receiverUserEmail { get; set; }
        public string connectionId { get; set; }
        public DateTime timeStamp { get; set; }
        public int messageYear { get; set; }
        public int messageMonth { get; set; }
        public int messageDay { get; set; }
        public int messageHour { get; set; }
        public int messageMinute { get; set; }
    }
}
