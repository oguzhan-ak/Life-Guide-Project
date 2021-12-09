import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
   apiUrl : string = "http://localhost:5001/api/";

  isUserAuthenticated() {
    const token: string= localStorage.getItem("jwt");
    if(token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }else{
      return false;
    }
  }

  logOut() {
    localStorage.removeItem("jwt");
  }

  logIn(credentials,url){
    return this.http.post(this.apiUrl+url,credentials)
  }

  signUp(credentials,url){
    return this.http.post(this.apiUrl+url,credentials)
  }
  constructor( private http:HttpClient, private jwtHelper : JwtHelperService) { }
}
