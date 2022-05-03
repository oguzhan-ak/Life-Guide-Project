export class Degree{
    public degree:string="";
    public isSelected:boolean=false;

    constructor(degree:string,isSelected:boolean=false){
        this.degree = degree;
        this.isSelected=isSelected;
    }
}