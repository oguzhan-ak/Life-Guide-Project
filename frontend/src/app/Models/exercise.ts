export class Exercise{
    public id:number;
    public videoLink:string="";
    public likedCount:number;
    public dislikedCount : number;
    public videoDegree : number;
    public videoTitle : string;

    constructor(id:number,videoLink:string,likedCount:number,dislikedCount:number,videoDegree:number, videoTitle : string){
        this.id = id;
        this.videoLink = videoLink;
        this.likedCount = likedCount;
        this.dislikedCount = dislikedCount;
        this.videoDegree = videoDegree;
        this.videoTitle = videoTitle;
    }
}