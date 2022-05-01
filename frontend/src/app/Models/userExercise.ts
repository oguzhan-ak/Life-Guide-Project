export class UserExercise{
    public id:number;
    public userEmail : string;
    public exerciseId : number;
    public action : string;

    constructor(id:number,userEmail:string,exerciseId:number,action : string){
        this.id = id;
        this.userEmail = userEmail;
        this.exerciseId = exerciseId;
        this.action = action;
    }
}