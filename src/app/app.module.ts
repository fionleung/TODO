import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ListOfListComponent } from './list-of-list/list-of-list.component';
import { HomeComponent } from './home/home.component';
import { notificationComponent } from './notification/notification.component';
import { AddlistComponent } from './addlist/addlist.component';
import { NavComponent } from './nav/nav.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpConfigInterceptor } from './ inteceptors/httpconfig.interceptor';
import { AngularMaterialModule } from './shared/angular-material.module';
import { LogoutConfirmComponent } from './nav/logout-confirm/logout-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    ListOfListComponent,
    HomeComponent,
    notificationComponent,
    AddlistComponent,
    NavComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    LogoutConfirmComponent,
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
   
    AngularMaterialModule 
  
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
