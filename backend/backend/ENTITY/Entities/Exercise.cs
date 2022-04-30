using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LifeGuideProject.API.ENTITY.Entities
{
    [Table("Exercise", Schema = "public")]
    public class Exercise
    {
        [Key]
        public int id { get; set; }
        public string videoLink { get; set; }
        public int likedCount { get; set; }
        public string dislikedCount { get; set; }
        public int videoDegree { get; set; }
    }
}
