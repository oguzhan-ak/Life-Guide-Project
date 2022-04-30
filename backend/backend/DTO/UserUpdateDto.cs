using System;

namespace LifeGuideProject.API.DTO
{
    public class UserUpdateDto
    {
        public string firstName { get; set; }
        public string secondName { get; set; }
        public string lastName { get; set; }
        public int birthDateYear { get; set; }
        public int birthDateMonth { get; set; }
        public int birthDateDay { get; set; }
        public double weight { get; set; }
        public int height { get; set; }
        public string gender { get; set; }
        public string address { get; set; }
        public string city { get; set; }
        public string country { get; set; }
        public string postCode { get; set; }
        public string telephone { get; set; }
        public string aboutMeText { get; set; }
        public string solver { get; set; }
        public string firstQuestion { get; set; }
        public string secondQuestion { get; set; }
        public string thirdQuestion { get; set; }
        public string fourthQuestion { get; set; }
        public string fifthQuestion { get; set; }
        public string userEmail { get; set; }
        public DateTime createdTime { get; set; }

        public UserUpdateDto(string firstName, string secondName, string lastName,
            int birthDateYear, int birthDateMonth, int birthDateDay, double weight,
            int height, string gender, string address, string city, string country,
            string postCode, string telephone, string aboutMeText, string solver,
            string firstQuestion, string secondQuestion, string thirdQuestion, string fourthQuestion,
            string fifthQuestion, string userEmail, DateTime createdTime)
        {
            this.firstName = firstName;
            this.secondName = secondName;
            this.lastName = lastName;
            this.birthDateYear = birthDateYear;
            this.birthDateMonth = birthDateMonth;
            this.birthDateDay = birthDateDay;
            this.weight = weight;
            this.height = height;
            this.gender = gender;
            this.address = address;
            this.city = city;
            this.country = country;
            this.postCode = postCode;
            this.telephone = telephone;
            this.aboutMeText = aboutMeText;
            this.solver = solver;
            this.firstQuestion = firstQuestion;
            this.secondQuestion = secondQuestion;
            this.thirdQuestion = thirdQuestion;
            this.fourthQuestion = fourthQuestion;
            this.fifthQuestion = fifthQuestion;
            this.userEmail = userEmail;
            this.createdTime = createdTime;
        }

        public UserUpdateDto()
        {

        }
    }
}
