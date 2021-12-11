import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  NgForm } from '@angular/forms';
import {Router} from "@angular/router";
import { catchError, retry } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { Constants } from 'src/app/Helper/constants';

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
    this.shared.Login(email,password).subscribe((data : any) =>{
      if(data.responseCode ==1){
        localStorage.setItem(Constants.USER_KEY,JSON.stringify(data.dateSet));
        this.router.navigate(["users"]);
      }
      console.log("response",data);
    },error =>{
      console.log("error",error);
    });
  }

  constructor(private router : Router,private shared:SharedService) {}

  

  ngOnInit() {
  }
  ngOnDestroy() {
  }

}
