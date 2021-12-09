import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";
import { catchError, retry } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  invalidLogin : boolean;
  loginErrorMessage : string;
  login(loginForm){
    const credentials = {
      'UserEmail' : loginForm.value.UserEmail,
      'UserPassword' : loginForm.value.UserPassword
  };
  this.shared.logIn(credentials,"auth/login")
      .subscribe(response=>{
        if(response == "Nok:Yanlış istek"){
          this.invalidLogin=true;
          this.loginErrorMessage="Bilinmeyen bir hata ile karşılaşıldı. Lütfen tekrar deneyiniz.";
        }else if(response == "Nok:Email veya şifre hatalı"){
          this.invalidLogin=true;
          this.loginErrorMessage="E-mail veya şifreyi hatalı girdiniz.";
        }else{
          const token = (<any>response).token;
          localStorage.setItem("jwt",token);
          this.invalidLogin=false;
          this.router.navigate([""]);
        }
        
      }) 
  }
  
  
  constructor(private router : Router,private shared:SharedService) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }

}
