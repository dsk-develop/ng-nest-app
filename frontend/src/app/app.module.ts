import { AppComponent } from './app.component'; 
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SafeHTMLPipe } from './@components/safe-html.pipe';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ApiService } from './services/api.service';
import { RegisterComponent } from './register/register.component';
import { TodoeditComponent } from './todoedit/todoedit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    SafeHTMLPipe,      
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    TodoeditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true,
      progressAnimation:'increasing'
    })
  ],
  providers: [
    ApiService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
