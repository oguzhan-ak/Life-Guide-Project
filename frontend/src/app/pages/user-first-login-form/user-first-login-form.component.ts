import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Cinsiyet } from 'src/app/Models/cinsiyet';
import { CozenKisi } from 'src/app/Models/cozenkisi';
import { DatePipe } from '@angular/common';
import { SharedService } from 'src/app/shared/shared.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Constants } from 'src/app/Helper/constants';
import { User } from 'src/app/Models/user';
import { Degree } from 'src/app/Models/degree';
import Util from 'src/app/utils/Util';
@Component({
  selector: 'app-user-first-login-form',
  templateUrl: './user-first-login-form.component.html',
  styleUrls: ['./user-first-login-form.component.scss'],
  providers: [DatePipe]
})
export class UserFirstLoginFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private shared:SharedService,private toastrService : ToastrService,private router : Router) { }

  currentDate : string = new Date().toLocaleDateString();
  submitted1=false;
  submitted2=false;
  submitted3=false;
  submitted4=false;
  degreeIndex = 0;
  step : any = 1;
  yas:number ;
  multiStep1= this.formBuilder.group({
      firstName : ['',Validators.required],
      secondName : [''],
      lastName : ['',Validators.required],
      birthDate : ['',Validators.required],
      weight : ['',[Validators.required,Validators.pattern("^([1-9][0-9]*)[,]?([0-9]*)$")]],
      height : ['',[Validators.required,Validators.pattern("^(([1-9][0-9]{2})|([1-9][0-9]{1})|([1-9]))$"), Validators.maxLength(3)]],
      gender : ['Erkek']
    },
    {
      validators: [Util.checkDate('birthDate'),Util.checkDateBigger('birthDate')]
    }
  )
  multiStep2= this.formBuilder.group({
    address : ['',Validators.required],
    city : ['',Validators.required],
    country : ['',Validators.required],
    postCode : ['',[Validators.required, Validators.maxLength(5),Validators.minLength(5)]],
    telephone : ['',[Validators.required, Validators.pattern("^[0][0-9]{10}$"), Validators.maxLength(11)]]
  })
  multiStep3= this.formBuilder.group({
    aboutMeText: ['']
  })
  multiStep4= this.formBuilder.group({
    solver : ['Çocuk'],
    degree : ["1"]
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
  public degrees: Degree[]=[
    {
      degree:"1",
      isSelected:true
    },
    {
      degree:"2",
      isSelected:false
    },
    {
      degree:"3",
      isSelected:false
    },
    {
      degree:"4",
      isSelected:false
    },
    {
      degree:"5",
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
          return;
        }else{
          this.yas=this.calculateAge();
          this.step= this.step+1;
        }
      }else if(this.step==2){
        this.submitted2=true;
        if (this.multiStep2.invalid) {
          return;
        }else{
          this.step= this.step+1;
        }
      }else if(this.step==3){
        this.submitted3=true;
        if (this.multiStep3.invalid) {
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
        this.shared.FirstForm(this.multiStep1,this.multiStep2,this.multiStep3,this.multiStep4).subscribe((data : any) =>{
          if(data.responseCode ==1){
            this.toastrService.success(data.responseMessage);
            const user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
            user.isFormDone=true;
            localStorage.setItem(Constants.USER_KEY,JSON.stringify(user));
            this.router.navigate(["dashboard"]);
          }else{
            this.toastrService.error(data.responseMessage);
          }
        },error =>{
          this.toastrService.error(error);
        });
      }
    }
  }
  geri(){
    if(this.step!=1){
      this.step= this.step-1;
    }
  }
  onDegreeChange(degree : string)
  {
    this.degrees.forEach(x=> {
      if(x.degree == degree){
        x.isSelected=true;
      }else{
        x.isSelected=false;
      }
    })
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
