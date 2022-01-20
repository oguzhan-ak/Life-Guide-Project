import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/Helper/constants';
import { User } from 'src/app/Models/user';

@Injectable({
  providedIn: 'root'
})
export class FirstFormGuardGuard implements CanActivate {
  constructor(private router : Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    const user = JSON.parse(localStorage.getItem(Constants.USER_KEY)) as User;
    if(!user){
      this.router.navigate(["login"]);
      return false;
    }else if(user && !user.isFormDone){
      return true;
    }else if(user.isFormDone){
      this.router.navigate(["dashboard"]);
      return false;
    }
  }
  
}
