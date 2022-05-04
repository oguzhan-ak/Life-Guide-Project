namespace LifeGuideProject.API.DTO
{
    public class UserDTO
    {
        public UserDTO(string fullName, string email, string userName, string role, bool isFormDone, int degree)
        {
            FullName = fullName;
            Email = email;
            UserName = userName;
            Role = role;
            IsFormDone = isFormDone;
            Degree = degree;
        }
        public UserDTO(string fullName, string email, string userName, string role, bool isFormDone, int degree, string token)
        {
            FullName = fullName;
            Email = email;
            UserName = userName;
            Role = role;
            IsFormDone = isFormDone;
            Token = token;
            Degree = degree;
        }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Token { get; set; }
        public string Role { get; set; }
        public bool IsFormDone { get; set; }
        public int Degree { get; set; }
    }
}
