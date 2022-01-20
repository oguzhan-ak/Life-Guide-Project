export class User{
    public email:string="";
    public userName:string="";
    public role:string="";
    public isFormDone : boolean=false;
    public token : string="";

    constructor(email:string,userName:string,role:string,isFormDone:boolean,token:string){
        this.email=email;
        this.userName=userName;
        this.role=role;
        this.isFormDone=isFormDone;
        this.token=token;
    }
}