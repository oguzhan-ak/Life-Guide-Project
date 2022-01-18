import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Cinsiyet } from 'src/app/Models/cinsiyet';
import { CozenKisi } from 'src/app/Models/cinsiyet copy';
import { DatePipe } from '@angular/common';
import Validation from 'src/app/utils/validation';
@Component({
  selector: 'app-user-first-login-form',
  templateUrl: './user-first-login-form.component.html',
  styleUrls: ['./user-first-login-form.component.scss'],
  providers: [DatePipe]
})
export class UserFirstLoginFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  currentDate : string = new Date().toLocaleDateString();
  submitted1=false;
  submitted2=false;
  submitted3=false;
  submitted4=false;
  step : any = 1;
  yas:number;
  multiStep1= this.formBuilder.group({
      firstName : ['',Validators.required],
      secondName : ['',Validators.required],
      lastName : ['',Validators.required],
      birthDate : [Date,Validators.required],
      weight : ['',Validators.required],
      height : ['',Validators.required],
      gender : ['Erkek']
    },
    {
      validators: [Validation.checkDate('birthDate')]
    }
    )
  multiStep2= this.formBuilder.group({
    address : ['',Validators.required],
    city : ['',Validators.required],
    country : ['',Validators.required],
    postCode : ['',Validators.required],
    telephone : ['',Validators.required]
  })
  multiStep3= this.formBuilder.group({
    aboutMeText: ['']
  })
  multiStep4= this.formBuilder.group({
    solver : ['Çocuk'],
    firstQuestion : ['Evet'],
    secondQuestion : ['Evet'],
    thirdQuestion : ['Evet'],
    fourthQuestion : ['Evet'],
    fifthQuestion : ['Evet']
  })

  get f1(): { [key: string]: AbstractControl } {
    return this.multiStep1.controls;
  }
  get f2(): { [key: string]: AbstractControl } {
    return this.multiStep2.controls;
  }
  get f3(): { [key: string]: AbstractControl } {
    return this.multiStep3.controls;
  }
  get f4(): { [key: string]: AbstractControl } {
    return this.multiStep4.controls;
  }
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
    var timeDiff= Math.abs(Date.now()-new Date(
      this.multiStep1.get('birthDate').value.year,
      this.multiStep1.get('birthDate').value.month,
      this.multiStep1.get('birthDate').value.day).getTime());
    return Math.floor(timeDiff / (1000*3600*24) / 365.25);
  }
  submit(){
    if(this.step!=4){
      if(this.step==1){
        this.submitted1=true;
        if (this.multiStep1.invalid) {
          console.log("1. de hatalar var")
          return;
        }else{
          this.yas=this.calculateAge();
          this.step= this.step+1;
        }
      }else if(this.step==2){
        this.submitted2=true;
        if (this.multiStep2.invalid) {
          console.log("2. de hatalar var")
          return;
        }else{
          this.step= this.step+1;
        }
      }else if(this.step==3){
        this.submitted3=true;
        if (this.multiStep3.invalid) {
          console.log("3. de hatalar var")
          return;
        }else{
          this.step= this.step+1;
        }
      }
    }else{
      this.submitted4=true;
      if (this.multiStep4.invalid) {
        return;
      }else{
        console.log(JSON.stringify(this.multiStep4.value, null, 2));
      }
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
