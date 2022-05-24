import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/Helper/constants';
import { Exercise } from 'src/app/Models/exercise';
import { User } from 'src/app/Models/user';
import { UserExercise } from 'src/app/Models/userExercise';
import { SharedService } from 'src/app/shared/shared.service';
@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {
  public user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
  constructor(private shared:SharedService,private router : Router) { 
    
  }
  public valueEmittedFromChildComponent : number;
  public exerciseList =[];
  public userExerciseList:UserExercise[] =[];
  ngDoCheck()	{
    var scroll = parseInt(localStorage.getItem(Constants.Scroll))
    var from = localStorage.getItem("from")
    var done = localStorage.getItem("done")
    if(from == "function"){
      window.scroll(0,scroll)
      localStorage.setItem("done","true")
      localStorage.removeItem("from")
    }else{
      if(done == "true"){
        window.scroll(0,scroll)
      }else{
        window.scroll(0,0)
      }
      
    }
  }
  ngOnInit() {
    this.GetExercises();
    this.GetUserExercises();
    localStorage.setItem("done","false")
  }
  public GetExercises(){
    this.shared.getAllExercises().subscribe((data : Exercise[]) => {
      this.exerciseList=data;
    })
  }
  public GetUserExercises(){
    this.shared.getAllUserExercises().subscribe((data : UserExercise[]) => {
      this.userExerciseList=data;
    })
  }
  parentEventHandlerFunction(valueEmitted){
    this.valueEmittedFromChildComponent = valueEmitted;
    this.reloadComponent()
  }
  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    
  }
}
