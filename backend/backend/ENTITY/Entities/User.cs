using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LifeGuideProject.API.DATA.Entities.User
{
    [Table("User")]
    public class User : BaseEntity
    {
        [Column("UserId")]
        [Key]
        public long UserId { get; set; }
        [Column("UserName")]
        public string UserName { get; set; }
        [Column("UserEmail")]
        public string UserEmail { get; set; }
        [Column("UserPassword")]
        public string UserPassword { get; set; }
        [Column("UserBirthDate")]
        public DateTime? UserBirthDate { get; set; }
        [Column("UserAge")]
        public long? UserAge { get; set; }
        [Column("UserHeight")]
        public double? UserHeight { get; set; }
        [Column("UserWeight")]
        public double? UserWeight { get; set; }

    }
}
