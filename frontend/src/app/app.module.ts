import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogTextComponent } from './pages/blog/blog-text/blog-text.component';
import { BlogSerebralPalsiComponent } from './pages/blog/blog-serebral-palsi/blog-serebral-palsi.component';
import { BlogYaslaraGoreComponent } from './pages/blog/blog-yaslara-gore/blog-yaslara-gore.component';
import { BlogOrtezlerComponent } from './pages/blog/blog-ortezler/blog-ortezler.component';
import { BlogAileEgitimiComponent } from './pages/blog/blog-aile-egitimi/blog-aile-egitimi.component';

export function tokenGetter(){
  return localStorage.getItem("jwt");
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config : {
        tokenGetter : tokenGetter,
        allowedDomains : ["localhost:5001"],
        disallowedRoutes : []
      }
    }),
    ToastrModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    BlogComponent,
    BlogTextComponent,
    BlogSerebralPalsiComponent,
    BlogYaslaraGoreComponent,
    BlogOrtezlerComponent,
    BlogAileEgitimiComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
