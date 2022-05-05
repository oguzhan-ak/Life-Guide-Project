using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LifeGuideProject.API.ENTITY.Entities
{
    [Table("Connection", Schema = "public")]
    public class Connection
    {
        [Key]
        public int id { get; set; }
        public string userEmail { get; set; }
        public string signalrId { get; set; }
        public DateTime TimeStamp { get; set; }

        public Connection(string userEmail, string signalrId, DateTime timeStamp)
        {
            this.userEmail = userEmail;
            this.signalrId = signalrId;
            TimeStamp = timeStamp;
        }
    }
}
