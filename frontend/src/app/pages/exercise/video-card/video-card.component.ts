import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/Helper/constants';
import { User } from 'src/app/Models/user';
import { UserExercise } from 'src/app/Models/userExercise';
import { SharedService } from 'src/app/shared/shared.service';


@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit,OnChanges {
    @Input() id:string;
    @Input() videoTitle:string;
    @Input() likedCount:string;
    @Input() dislikedCount:string;
    @Input() videoLink:string;
    @Input() userExercises : UserExercise[];
    @Output() buttonClicked : EventEmitter<number> = new EventEmitter<number>();
    public state:string = "yeni";
    public liked:string = "false"
    public disliked:string = "false"
    public userExerciseList:UserExercise[] =[];
  constructor(private sanitizer : DomSanitizer, private shared:SharedService,private toastrService : ToastrService,private router : Router) {
    
  }
  ngOnChanges(){
      this.assignValues()
  }
  ngOnInit(): void {
    this.videoLink= this.sanitizer.bypassSecurityTrustResourceUrl(this.videoLink) as string;
  }
  action(action : string, exerciseId : string) {
    var scroll = window.pageYOffset;
    localStorage.setItem(Constants.Scroll,scroll.toString());
    localStorage.setItem("from","function");
    this.buttonClicked.emit(scroll)
    let userInfo=JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
    this.shared.ApplyActionToExercises(userInfo.email, parseInt(exerciseId), action).subscribe(res => {
    });
  }
  assignValues(){
    if(this.userExercises.length > 0){
        for (let step = 0; step < this.userExercises.length; step++) { 
            if(this.userExercises[step].action == "begen" && this.userExercises[step].exerciseId.toString()== this.id){
                this.liked = "true"
                this.disliked = "false"
            }else if(this.userExercises[step].action == "begenme" && this.userExercises[step].exerciseId.toString()== this.id){
                this.disliked = "true"
                this.liked = "false"
            }else if(this.userExercises[step].action == "izledim" && this.userExercises[step].exerciseId.toString()== this.id){
                this.state = "izlendi"
            }else if(this.userExercises[step].action == "izlemedim" && this.userExercises[step].exerciseId.toString()== this.id){
                this.state = "yeni"
            }else{

            }
          }
    }else{
    }
  }
}