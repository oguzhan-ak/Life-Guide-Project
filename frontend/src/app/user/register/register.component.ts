import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/Models/role';
import { SharedService } from 'src/app/shared/shared.service';
import { ToastrService } from 'ngx-toastr';

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
    let fullName= registerForm.value.FullName;
    let email= registerForm.value.UserEmail;
    let password= registerForm.value.UserPassword;
    if(fullName==""){
      this.toastrService.error("Enter your full name.");
    }
    if(email==""){
      this.toastrService.error("Enter your email.");
    }
    if(password==""){
      this.toastrService.error("Enter your password.");
    }
    if(fullName == "" || email == "" || password ==""){
      return;
    }
    this.shared.Register(fullName,email,password,this.roles.filter(x=> x.isSelected)[0].role).subscribe((data) =>{
      if(data.responseCode ==1){
        this.toastrService.success(data.responseMessage);
        this.router.navigate(["first-form"])
        
      }else{
        if(data.dateSet!=null){
          data.dateSet.forEach(element => {
            this.toastrService.error(element);
          });
        }else{
          this.toastrService.error(data.responseMessage);
        }
        
      }
      
    },error =>{
      console.log("error",error);
      this.toastrService.error(error);
    });
  }

  getRoles()
  {
    this.shared.getRoles().subscribe(roles => {
      this.roles=roles;
      this.roles[1].isSelected=true;
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


  constructor(private router : Router,private shared:SharedService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.getRoles();
  }

}
