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
    const credentials = {
      'UserName' : registerForm.value.UserName,
      'UserEmail' : registerForm.value.UserEmail,
      'UserPassword' : registerForm.value.UserPassword
  };
  this.shared.signUp(credentials,"auth/register")
      .subscribe(response=>{
        if(response=="Nok:Same email"){
          this.registerErrorMessage= "Girdiğiniz e-mail daha önce kullanılmış.";
          this.invalidRegister= true;
        }else{
          this.invalidRegister=false;
          this.router.navigate(["/login"]);
        }
      },
      error => {
        this.invalidRegister=true;
      }) 
  }

  constructor(private router : Router,private shared:SharedService) { }

  ngOnInit() {
  }

}
