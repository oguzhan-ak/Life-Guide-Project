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
   
  constructor( private http:HttpClient) { }
   
  private readonly apiUrl : string = "http://localhost:5001/api/";
  
  public Login(email:string,password:string){
    const body= {
      Email:email,
      Password:password
    };
    return this.http.post<ResponseModel>(this.apiUrl+'Auth/Login',body);
  }
  public Register(email:string,password:string,role:string){
    const body= {
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
            userList.push(new User(x.email,x.userName,x.role,x.isFormDone,""));
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
  public FirstForm(part1:any,part2:any,part3:any,part4:any){
    const user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
    const date=  part1.get('birthDate').value;
    const body= {
      firstName:part1.get('firstName').value,
      secondName:part1.get('secondName').value,
      lastName : part1.get('lastName').value,
      birthDateYear : part1.get('birthDate').value.year.toString(),
      birthDateMonth : part1.get('birthDate').value.month.toString(),
      birthDateDay : part1.get('birthDate').value.day.toString(),
      weight : part1.get('weight').value,
      height : part1.get('height').value,
      gender : part1.get('gender').value,
      address : part2.get('address').value,
      city : part2.get('city').value,
      country : part2.get('country').value,
      postCode : part2.get('postCode').value,
      telephone : part2.get('telephone').value,
      aboutMeText : part3.get('aboutMeText').value,
      solver : part4.get('solver').value,
      firstQuestion : part4.get('firstQuestion').value,
      secondQuestion : part4.get('secondQuestion').value,
      thirdQuestion : part4.get('thirdQuestion').value,
      fourthQuestion : part4.get('fourthQuestion').value,
      fifthQuestion : part4.get('fifthQuestion').value,
      userEmail : user.email
    };
    return this.http.post<ResponseModel>(this.apiUrl+'Auth/FirstForm',body);
  }
}
