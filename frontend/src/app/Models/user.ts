export class User{
    public email:string="";
    public userName:string="";
    public role:string=""

    constructor(email:string,userName:string,role:string){
        this.email=email;
        this.userName=userName;
        this.role=role;
    }
}