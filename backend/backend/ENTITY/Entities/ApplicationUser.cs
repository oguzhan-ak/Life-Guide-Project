using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace LifeGuideProject.API.ENTITY.Entities
{
    public class ApplicationUser : IdentityUser
    {
        [Column("FullName")]
        public string FullName { get; set; }
        [Column("CreatedTime")]
        public DateTime CreatedTime { get; set; } = DateTime.Now;
        [Column("UpdatedTime")]
        public DateTime? UpdatedTime { get; set; }
        [Column("IsActive")]
        public bool IsActive { get; set; } = true;
        [Column("IsFormDone")]
        public bool IsFormDone { get; set; }
        [Column("Degree")]
        public int Degree { get; set; }
    }
}
