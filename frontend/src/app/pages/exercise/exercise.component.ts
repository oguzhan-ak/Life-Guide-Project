import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/Models/exercise';
import { UserExercise } from 'src/app/Models/userExercise';
import { SharedService } from 'src/app/shared/shared.service';
@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {

  constructor(private shared:SharedService) { }
  
  public exerciseList:Exercise[] =[];
  public userExerciseList:UserExercise[] =[];
  
  ngOnInit(): void {
    this.GetExercises();
    this.GetUserExercises();
  }
  public GetExercises(){
    this.shared.getAllExercises(3).subscribe((data : Exercise[]) => {
      this.exerciseList=data;
    })
  }
  public GetUserExercises(){
    this.shared.getAllUserExercises().subscribe((data : UserExercise[]) => {
      this.userExerciseList=data;
    })
  }

}
