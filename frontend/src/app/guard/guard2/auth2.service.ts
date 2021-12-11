import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/Helper/constants';
import { User } from 'src/app/Models/user';

@Injectable({
  providedIn: 'root'
})
export class Auth2GuardService implements CanActivate{

  constructor(private router : Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
    if(user && user.email){
      this.router.navigate(["users"])
      return false;
    }else{
      return true;
    }
  }
}
//// Giriş yapam birisi bidaha giriş veya kayıt oluşturma sayfasına gidemez.