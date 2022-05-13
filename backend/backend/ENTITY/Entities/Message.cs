using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LifeGuideProject.API.ENTITY.Entities
{
    [Table("Message", Schema = "public")]
    public class Message
    {
        [Key]
        public int id { get; set; }
        public string senderUserEmail { get; set; }
        public string receiverUserEmail { get; set; }
        public string message { get; set; }
        public string connectionId { get; set; }
        public DateTime timeStamp { get; set; }
        public int messageYear { get; set; }
        public int messageMonth { get; set; }
        public int messageDay { get; set; }
        public int messageHour { get; set; }
        public int messageMinute { get; set; }

        public Message(string senderUserEmail, string receiverUserEmail, string message, string connectionId, DateTime timeStamp, int messageYear, int messageMonth,
            int messageDay, int messageHour, int messageMinute)
        {
            this.senderUserEmail = senderUserEmail;
            this.receiverUserEmail = receiverUserEmail;
            this.message = message;
            this.connectionId = connectionId;
            this.timeStamp = timeStamp;
            this.messageYear = messageYear;
            this.messageMonth = messageMonth;
            this.messageDay = messageDay;
            this.messageHour = messageHour;
            this.messageMinute = messageMinute;
        }
    }
}
