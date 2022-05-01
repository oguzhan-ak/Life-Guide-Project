import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/Helper/constants';
import { User } from 'src/app/Models/user';
import { UserExercise } from 'src/app/Models/userExercise';
import { SharedService } from 'src/app/shared/shared.service';


@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {

  constructor(private sanitizer : DomSanitizer, private shared:SharedService,private toastrService : ToastrService,private router : Router) { }
  @Input() id:string;
  @Input() videoTitle:string;
  @Input() likedCount:string;
  @Input() dislikedCount:string;
  @Input() videoLink:string;
  @Input() userExercises : UserExercise[];
  public state:string ="yeni"
  public liked:string = "true"
  public disliked:string = "false"
  ngOnInit(): void {
    this.videoLink= this.sanitizer.bypassSecurityTrustResourceUrl(this.videoLink) as string;
    this.assignValues();
  }
  action(action : string, exerciseId : string) {
    let userInfo=JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
    this.shared.ApplyActionToExercises(userInfo.email, parseInt(exerciseId), action).subscribe(res => {
      this.reloadComponent()
    });
  }
  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
  }
  assignValues(){
    // burada gelen userExercises listesini filtreleyerek state, liked,disliked gigi değişkenleri değiştir
  }
}