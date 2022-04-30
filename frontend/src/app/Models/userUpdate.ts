export class UserUpdateDto{
    public id : number;
    public firstName:string="";
    public secondName:string="";
    public lastName:string="";
    public birthDateYear : number;
    public birthDateMonth : number;
    public birthDateDay : number;
    public weight : number;
    public height : number;
    public gender : string="";
    public address : string="";
    public city : string="";
    public country : string="";
    public postCode : string="";
    public telephone : string="";
    public aboutMeText : string="";
    public solver : string="";
    public firstQuestion : string="";
    public secondQuestion : string="";
    public thirdQuestion : string="";
    public fourthQuestion : string="";
    public fifthQuestion : string="";
    public userEmail : string="";
    public createdTime : Date;


    constructor(firstName:string,secondName:string,lastName:string,birthDateYear:number,birthDateMonth:number,
        birthDateDay:number, weight:number,height:number,gender:string, address:string, city:string, country:string, postCode:string, 
        telephone:string, aboutMeText:string, solver:string, firstQuestion : string, secondQuestion : string, thirdQuestion : string,
        fourthQuestion : string, fifthQuestion : string, userEmail : string, createdTime : Date, id : number){
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
            this.fifthQuestion = fifthQuestion;
            this.fourthQuestion =fourthQuestion;
            this.thirdQuestion = thirdQuestion;
            this.secondQuestion = secondQuestion;
            this.firstQuestion = firstQuestion;
            this.userEmail = userEmail;
            this.createdTime = createdTime;
            this.id = id;
    }
}