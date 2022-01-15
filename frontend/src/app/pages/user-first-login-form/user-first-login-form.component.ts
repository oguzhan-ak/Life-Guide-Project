import { Component, OnInit } from '@angular/core';
import { Cinsiyet } from 'src/app/Models/cinsiyet';
import { CozenKisi } from 'src/app/Models/cinsiyet copy';

@Component({
  selector: 'app-user-first-login-form',
  templateUrl: './user-first-login-form.component.html',
  styleUrls: ['./user-first-login-form.component.scss']
})
export class UserFirstLoginFormComponent implements OnInit {

  constructor() { }

  step : any = 1;
  yas:number = 12;
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
  public anket_cozenler: CozenKisi[]=[
    {
      cozen:"Çocuk",
      isSelected:true
    },
    {
      cozen:"Evebeyn",
      isSelected:false
    }
  ]
  ngOnInit(): void {
  }

  submit(){
    if(this.step!=4){
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
  onCozenChange(cozen : string)
  {
    this.anket_cozenler.forEach(x=> {
      if(x.cozen == cozen){
        x.isSelected=true;
      }else{
        x.isSelected=false;
      }
    })
  }
  findCozenSelected():string{
    if(this.anket_cozenler[0].isSelected==true){
      return this.anket_cozenler[0].cozen
    }else{
      return this.anket_cozenler[1].cozen
    }
  }
}
