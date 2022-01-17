import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  yas:number;
  multiStep= new FormGroup({
    userDetails : new FormGroup({
      firstName : new FormControl(''),
      secondName : new FormControl(''),
      lastName : new FormControl(''),
      birthDate : new FormControl(),
      weight : new FormControl(''),
      height : new FormControl(''),
      gender : new FormControl('Erkek')
    }),
    contactDetails : new FormGroup({
      address : new FormControl(''),
      city : new FormControl(''),
      country : new FormControl(''),
      postCode : new FormControl(''),
      telephone : new FormControl('')
    }),
    aboutMe: new FormGroup({
      aboutMeText: new FormControl('')
    }),
    survey : new FormGroup({
      solver : new FormControl('Çocuk'),
      firstQuestion : new FormControl('Evet'),
      secondQuestion : new FormControl('Evet'),
      thirdQuestion : new FormControl('Evet'),
      fourthQuestion : new FormControl('Evet'),
      fifthQuestion : new FormControl('Evet')
    })
  })



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
  calculateAge():number{
    console.log(this.multiStep.value.userDetails.birthDate.year)
    var timeDiff= Math.abs(Date.now()-new Date(this.multiStep.value.userDetails.birthDate.year,this.multiStep.value.userDetails.birthDate.month,this.multiStep.value.userDetails.birthDate.day).getTime());
    console.log(timeDiff)
    console.log(this.multiStep.value.userDetails.birthDate);
    console.log(Math.floor(timeDiff / (1000*3600*24) / 365.25));
    return Math.floor(timeDiff / (1000*3600*24) / 365.25);
  }
  submit(){
    if(this.step > 0){
      console.log("girdi");
      this.yas=this.calculateAge();
      console.log(this.yas);
    }
    if(this.step!=4){
      this.step= this.step+1;
    }else{
      /// formu shareda gönder
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
