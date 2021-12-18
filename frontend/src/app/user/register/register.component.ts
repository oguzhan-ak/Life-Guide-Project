import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/Models/role';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public invalidRegister : boolean;
  public registerErrorMessage :string;
  public roles: Role[]=[]

  register(registerForm){
    console.log("on submit", this.roles);
    let fullName= registerForm.value.FullName;
    let email= registerForm.value.UserEmail;
    let password= registerForm.value.UserPassword;
    this.shared.Register(fullName,email,password,this.roles.filter(x=> x.isSelected)[0].role).subscribe((data) =>{
      if(data.responseCode ==1){
        this.router.navigate(["users"]);
      }
      console.log("response",data);
    },error =>{
      console.log("error",error);
    });
  }

  getRoles()
  {
    this.shared.getRoles().subscribe(roles => {
      this.roles=roles;
    })
  }

  onRoleChange(role : string)
  {
    this.roles.forEach(x=> {
      if(x.role == role){
        x.isSelected=true;
      }else{
        x.isSelected=false;
      }
    })
  }


  constructor(private router : Router,private shared:SharedService) { }

  ngOnInit() {
    this.getRoles();
  }

}
