import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { TablesComponent } from './pages/tables/tables.component';
import { IconsComponent } from './pages/icons/icons.component';
import { MapsComponent } from './pages/maps/maps.component';
import { Auth1GuardService } from './guard/guard1/auth1.service';
import { Auth2GuardService } from './guard/guard2/auth2.service';
import { BlogComponent } from './pages/blog/blog.component';
import { UserFirstLoginFormComponent } from './pages/user-first-login-form/user-first-login-form.component';
import { FirstFormGuardGuard } from './guard/firstFormGuard/first-form-guard.guard';
import { UserListComponent } from './component/user-list/user-list.component';

const routes: Routes =[
  // Admin Layout
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
        pathMatch:'full',
        canActivate:[Auth2GuardService]
      },
      {
        path : 'login',
        component:LoginComponent,
        canActivate:[Auth2GuardService]
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate:[Auth2GuardService]
      },
      {
        path: 'users',
        component: UserListComponent,
        canActivate:[Auth1GuardService]
      }
    ]
  }, 
  // Authorization Layout
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component:DashboardComponent,
        canActivate:[Auth1GuardService]
      },
      {
        path: 'user-profile',
        component:UserProfileComponent,
        canActivate:[Auth1GuardService]
      },
      {
        path: 'tables',
        component:TablesComponent,
        canActivate:[Auth1GuardService]
      },
      {
        path: 'icons',
        component:IconsComponent,
        canActivate:[Auth1GuardService]
      },
      {
        path: 'maps',
        component:MapsComponent,
        canActivate:[Auth1GuardService]
      },
      {
        path: 'first-form',
        component:UserFirstLoginFormComponent,
        canActivate:[FirstFormGuardGuard]
      }
    ]
  },
  {
    path: 'blog',
    component: BlogComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
