import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import { ResponseCode } from '../Enums/responseCode';
import { Constants } from '../Helper/constants';
import { ResponseModel } from '../Models/responseModel';
import { Role } from '../Models/role';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
   
  constructor( private http:HttpClient, private jwtHelper : JwtHelperService) { }
   
  private readonly apiUrl : string = "http://localhost:5001/api/";
  
  public Login(email:string,password:string){
    const body= {
      Email:email,
      Password:password
    };
    return this.http.post<ResponseModel>(this.apiUrl+'Auth/Login',body);
  }
  public Register(fullname :string,email:string,password:string,role:string){
    const body= {
      FullName:fullname,
      Email:email,
      Password:password,
      Role : role
    };
    return this.http.post<ResponseModel>(this.apiUrl+'Auth/Register',body);
  }

  public getAllUser(){
    let userInfo=JSON.parse(localStorage.getItem(Constants.USER_KEY));
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${ userInfo?.token}`
    });
    return this.http.get<ResponseModel>(this.apiUrl+'Auth/GetUsers',{headers:headers}).pipe(map(res => {
      if(res.responseCode==ResponseCode.OK){
        let userList= new Array<User>();
        if(res.dateSet){
          res.dateSet.map((x:User) =>{
            userList.push(new User(x.fullName,x.email,x.userName,x.role));
          });
        }
        return userList;
      }
    }));
  }
  
  public getRoles(){
    let userInfo=JSON.parse(localStorage.getItem(Constants.USER_KEY));
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${ userInfo?.token}`
    });
    return this.http.get<ResponseModel>(this.apiUrl+'Auth/GetRoles',{headers:headers}).pipe(map(res => {
      if(res.responseCode==ResponseCode.OK){
        let roleList= new Array<Role>();
        if(res.dateSet){
          res.dateSet.map((x:string) =>{
            roleList.push(new Role(x));
          });
        }
        return roleList;
      }
    }));
  }
}
