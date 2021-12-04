using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LifeGuideProject.API.DATA.Entities
{
    public class BaseEntity
    {
        [Column("CreatedTime")]
        public DateTime CreatedTime { get; set; } = DateTime.Now;
        [Column("UpdatedTime")]
        public DateTime? UpdatedTime { get; set; }
        [Column("IsActive")]
        public bool IsActive { get; set; } = true;
    }
}
