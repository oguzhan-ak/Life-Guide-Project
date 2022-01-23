import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {

  constructor(private sanitizer : DomSanitizer) { }
  @Input() videoId:string;
  @Input() videoTitle:string;
  @Input() likeCount:string;
  @Input() dislikeCount:string;
  @Input() videoLink:string;
  @Input() state:string
  @Input() liked:string
  @Input() disliked:string
  ngOnInit(): void {
    this.videoLink= this.sanitizer.bypassSecurityTrustResourceUrl(this.videoLink) as string;
  }
  begen(){
    let newCount= parseInt(this.likeCount)+1;
    this.likeCount= newCount.toString();
    if(this.liked=="true" && this.disliked=="false"){
      let a= parseInt(this.likeCount)-1;
      this.likeCount= a.toString();
      this.liked="false";
    }else if(this.liked=="false" && this.disliked=="false"){
      let b= parseInt(this.likeCount)+1;
      this.likeCount= b.toString();
      this.liked="true";
    }else if(this.liked=="false" && this.disliked=="true"){
      this.liked="true";
      this.disliked="false";
      let c= parseInt(this.likeCount)+1;
      this.likeCount= c.toString();
      let d= parseInt(this.likeCount)-1;
      this.dislikeCount= d.toString();
    }else{
      return
    }
    //// shareda video tablosunu güncellemek için istek at
  }
  begenme(){
    let newCount= parseInt(this.dislikeCount)-1;
    this.dislikeCount= newCount.toString();
    //// shareda video tablosunu güncellemek için istek at

  }
  setState(status:any){
    if(status == "izlendi"){
      this.state= "yeni";
    }else{
      this.state="izlendi";
    }
    /// shareda istek at video-user tablosunu güncellemek için
  }
}
