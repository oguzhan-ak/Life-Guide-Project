import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SharedService } from 'src/app/shared/shared.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Constants } from 'src/app/Helper/constants';
import { User } from 'src/app/Models/user';
import { UserUpdateDto } from 'src/app/Models/userUpdate';
import Validation from 'src/app/utils/validation';
import { UserExercise } from 'src/app/Models/userExercise';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [DatePipe]
})
export class UserProfileComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private shared:SharedService,private toastrService : ToastrService,private router : Router) { }
  public updateUserModel  = new UserUpdateDto("","","",0,0,0,0,0,"","","","","","","","","","","","","","",new Date(),0);

  public userExerciseList:UserExercise[] =[];
  public likedCount : number = 0;
  public watchedCount : number = 0;
  public degree:number = 0 ;
  updateForm= this.formBuilder.group({
    firstName : ['',Validators.required],
    secondName : [''],
    lastName : ['',Validators.required],
    weight : ['',[Validators.required,Validators.pattern("^([1-9][0-9]*)[,]?([0-9]*)$")]],
    height : ['',[Validators.required,Validators.pattern("^(([1-9][0-9]{2})|([1-9][0-9]{1})|([1-9]))$"), Validators.maxLength(3)]],
    address : ['',Validators.required],
    city : ['',Validators.required],
    country : ['',Validators.required],
    postCode : ['',[Validators.required, Validators.maxLength(5),Validators.minLength(5)]],
    telephone : ['',[Validators.required, Validators.pattern("^[0][0-9]{10}$"), Validators.maxLength(11)]],
    aboutMeText: [''],
    solver : ['Çocuk'],
  })
  
  get f(): { [key: string]: AbstractControl } {
    return this.updateForm.controls;
  }
  public GetUserExercises(){
    this.shared.getAllUserExercises().subscribe((data : UserExercise[]) => {
      this.userExerciseList=data;
      console.log("girdi")
    })
  }
  ngDoCheck(){
    this.initialize()
  }
  ngOnInit() {
    const user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
    var userEmail = user.email
    var res = this.shared.getUser(userEmail). subscribe(response => {
        var model = new UserUpdateDto(response.dateSet.firstName,response.dateSet.secondName, response.dateSet.lastName, 
        response.dateSet.birthDateYear, response.dateSet.birthDateMonth, response.dateSet.birthDateDay, response.dateSet.weight, response.dateSet.height, response.dateSet.gender,
        response.dateSet.address, response.dateSet.city, response.dateSet.country,
        response.dateSet.postCode, response.dateSet.telephone, response.dateSet.aboutMeText,response.dateSet.solver, response.dateSet.firstQuestion,
        response.dateSet.secondQuestion, response.dateSet.thirdQuestion, response.dateSet.fourthQuestion, response.dateSet.fifthQuestion,
        response.dateSet.userEmail, response.dateSet.createedTime, response.dateSet.id);
        this.updateUserModel = model
    });
    this.GetUserExercises();
  }
  initialize(){
    const user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
    this.degree = user.degree
    var liked =0;
    var watched =0;
    console.log(this.userExerciseList)
    for (var i = 0; i<this.userExerciseList.length; i++){
      if(this.userExerciseList[i].action == "begen"){
        liked++
      }
      if(this.userExerciseList[i].action == "izledim"){
        watched++
      }
    }
    this.likedCount = liked
    this.watchedCount = watched
  }
  calculateAge(birthDateYear,birthDateMonth,birthDateDay){
    var today = new Date();
    var birthDate = new Date(birthDateYear.toString() + '-' + birthDateMonth.toString() + '-' + birthDateDay.toString())
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  submit(){
    if (this.updateForm.invalid) {
      return;
    }else{
      this.shared.updateUser(this.updateForm,this.updateUserModel).subscribe((data : any) =>{
        if(data.responseCode ==1){
          this.toastrService.success(data.responseMessage);
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
