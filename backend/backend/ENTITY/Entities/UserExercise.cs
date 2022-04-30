using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LifeGuideProject.API.ENTITY.Entities
{
    [Table("UserExercise", Schema = "public")]
    public class UserExercise
    {
        [Key]
        public int id { get; set; }
        public string userEmail { get; set; }
        public int exerciseId { get; set; }
        public string action { get; set; }

    }
}
