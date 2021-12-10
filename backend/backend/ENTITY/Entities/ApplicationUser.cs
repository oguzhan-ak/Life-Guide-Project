using LifeGuideProject.API.DATA.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LifeGuideProject.API.ENTITY.Entities
{
    public class ApplicationUser : IdentityUser
    {

        [Column("UserBirthDate")]
        public DateTime? UserBirthDate { get; set; }
        [Column("UserAge")]
        public long? UserAge { get; set; }
        [Column("UserHeight")]
        public double? UserHeight { get; set; }
        [Column("UserWeight")]
        public double? UserWeight { get; set; }
        [Column("FullName")]
        public string FullName { get; set; }
        [Column("CreatedTime")]
        public DateTime CreatedTime { get; set; } = DateTime.Now;
        [Column("UpdatedTime")]
        public DateTime? UpdatedTime { get; set; }
        [Column("IsActive")]
        public bool IsActive { get; set; } = true;
    }
}
