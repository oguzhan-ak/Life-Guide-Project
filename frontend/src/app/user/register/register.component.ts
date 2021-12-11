import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  invalidRegister : boolean;
  registerErrorMessage :string;
  
  register(registerForm){
    let fullName= registerForm.value.FullName;
    let email= registerForm.value.UserEmail;
    let password= registerForm.value.UserPassword;
    this.shared.Register(fullName,email,password).subscribe((data) =>{
      console.log("response",data);
    },error =>{
      console.log("error",error);
    });
  }

  constructor(private router : Router,private shared:SharedService) { }

  ngOnInit() {
  }

}
