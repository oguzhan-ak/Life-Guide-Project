import { Component, OnInit } from '@angular/core';
import { Cinsiyet } from 'src/app/Models/cinsiyet';
declare var $:any;

@Component({
  selector: 'app-user-first-login-form',
  templateUrl: './user-first-login-form.component.html',
  styleUrls: ['./user-first-login-form.component.scss']
})
export class UserFirstLoginFormComponent implements OnInit {

  constructor() { }

  step : any =1;
  public cinsiyetler: Cinsiyet[]=[
    {
      cinsiyet:"Erkek",
      isSelected:true
    },
    {
      cinsiyet:"Kadın",
      isSelected:false
    }
  ]
  ngOnInit(): void {
  }

  submit(){
    if(this.step!=3){
      this.step= this.step+1;
    }
  }
  geri(){
    if(this.step!=1){
      this.step= this.step-1;
    }
  }
  onCinsiyetChange(cinsiyet : string)
  {
    this.cinsiyetler.forEach(x=> {
      if(x.cinsiyet == cinsiyet){
        x.isSelected=true;
      }else{
        x.isSelected=false;
      }
    })
  }
}
