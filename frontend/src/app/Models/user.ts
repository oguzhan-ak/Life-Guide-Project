export class User{
    public email:string="";
    public userName:string="";
    public role:string="";
    public isFormDone : boolean=false;
    public token : string="";
    public degree : number;
    public name : string="";
    public gender : string="";

    constructor(email:string,userName:string,role:string,isFormDone:boolean,token:string, degree:number, name : string, gender:string){
        this.email=email;
        this.userName=userName;
        this.role=role;
        this.isFormDone=isFormDone;
        this.token=token;
        this.degree = degree;
        this.name = name;
        this.gender = gender;
    }
}