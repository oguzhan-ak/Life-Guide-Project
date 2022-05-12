import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from "@angular/router";
import { SharedService } from 'src/app/shared/shared.service';
import { Constants } from 'src/app/Helper/constants';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  invalidLogin : boolean;
  loginErrorMessage : string;

  login(loginForm){
    let email= loginForm.value.UserEmail;
    let password= loginForm.value.UserPassword;
    if(email == ""){
      this.toastrService.error("Enter your email");
    }
    if(password == ""){
      this.toastrService.error("Enter your password");
    }
    if(email =="" || password ==""){
      return;
    }
    this.shared.Login(email,password).subscribe((data : any) =>{
      if(data.responseCode ==1){
        localStorage.setItem(Constants.USER_KEY,JSON.stringify(data.dateSet));
        this.toastrService.success(data.responseMessage);
        if(data.dateSet.isFormDone==false){
          this.router.navigate(["first-form"])
        }else{
          this.router.navigate(["dashboard"]);
        }
      }else{
        this.toastrService.error(data.responseMessage);
      }
      
    },error =>{
      this.toastrService.error(error);
    });
  }

  constructor(private router : Router,private shared:SharedService,private toastrService : ToastrService) {}

  

  ngOnInit() {
    
  }
  ngOnDestroy() {
  }

}
