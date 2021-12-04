import { Routes } from '@angular/router';

import { LoginComponent } from '../../user/login/login.component';
import { RegisterComponent } from '../../user/register/register.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent }
];
