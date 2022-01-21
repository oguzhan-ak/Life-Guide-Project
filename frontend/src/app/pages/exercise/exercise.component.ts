import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {

  constructor() { }
  public videoTitle:string;
  public likeCount:string;
  public dislikeCount:string;
  public videoLink:string;
  ngOnInit(): void {
  }
  

}
