import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import {  Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject } from "rxjs";
import { ApiService } from "./services/api.service";
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showHomeContent = true; 

  toggleView(showHome: boolean) {
    this.showHomeContent = showHome;
  }
  private tokenSubject = new BehaviorSubject<string>('');
  showMenu: boolean = true;
  username: any = '';
  password: string = '';
  loginObj = {
    username: this.username,
    password: this.password
  };
  showUser: boolean = false;
  title = 'todo-app';
  showTodo: boolean = false;
  isLoginPage: boolean = true;
  isSignUp: boolean = false;
  showForms: boolean = true;
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService,private apiService: ApiService, 
  ) {
    this.tokenSubject.next('');
    
  }

  ngOnInit(): void {  }
  // logout
  logout(): void {
    console.log('Logout');
    // this.apiService.logout(); 
    this.showUser = false; 
    this.router.navigate(['/login']); 
  }
  openTodoForm() {
    this.showTodo = true;
    // this.router.navigate(['/']);
  }
  closeTodoForm() {
    this.showTodo = false;
  }
}
