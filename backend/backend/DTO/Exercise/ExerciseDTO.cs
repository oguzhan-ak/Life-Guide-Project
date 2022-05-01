namespace LifeGuideProject.API.DTO
{
    public class ExerciseDTO
    {
        public int id { get; set; }
        public string videoLink { get; set; }
        public int likedCount { get; set; }
        public int dislikedCount { get; set; }
        public int videoDegree { get; set; }
        public string videoTitle { get; set; }
    }
}
