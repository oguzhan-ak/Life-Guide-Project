namespace LifeGuideProject.API.DTO
{
    public class UserDTO
    {
        public UserDTO(string fullName, string email, string userName, string role, bool isFormDone, int degree, string name, string gender)
        {
            FullName = fullName;
            Email = email;
            UserName = userName;
            Role = role;
            IsFormDone = isFormDone;
            Degree = degree;
            Name = name;
            Gender = gender;
        }
        public UserDTO(string fullName, string email, string userName, string role, bool isFormDone, int degree, string name, string gender, string token)
        {
            FullName = fullName;
            Email = email;
            UserName = userName;
            Role = role;
            IsFormDone = isFormDone;
            Token = token;
            Name = name;
            Gender = gender;
            Degree = degree;
        }
        public UserDTO()
        {
        }
        public UserDTO(string fullName, string email, string userName, string role, bool isFormDone, int degree)
        {
            FullName = fullName;
            Email = email;
            UserName = userName;
            Role = role;
            IsFormDone = isFormDone;
            Degree = degree;
        }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Token { get; set; }
        public string Role { get; set; }
        public bool IsFormDone { get; set; }
        public int Degree { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
    }
}
