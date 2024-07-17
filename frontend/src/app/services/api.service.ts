import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, timeout } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environments';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private token: string = '';
  private jwtToken$ = new BehaviorSubject<string | null>(null);
  jwtToken: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) { 
    const fetchToken: string | null = localStorage.getItem('act');

      if (fetchToken) {
        this.token = atob(fetchToken);
        this.jwtToken$.next(this.token);
      }
  }
  // register
  register(userData: any): Observable<any> {
    const url = `${environment.base_url}/user/register`;
    return this.http.post(url, userData);
  }
  // login  
  login(email: string, password: string): Observable<any> {
    const url = `${environment.base_url}/user/login`;
    return this.http.post(url, { email, password });
  }
  // logout
  logout() {
    this.token = '';
    this.jwtToken$.next(this.token);
    this.toastr
      .success('Logged out Successfully', '', { timeOut: 700 })
      .onHidden.subscribe((): void => {
        localStorage.removeItem('act');
        this.router.navigateByUrl('/login').then();
      });
    return '';
  }
  // create todo
  createToDo(body: {title: string, description: string, status: string}): Observable<any> {
    return this.http.post(`${environment.base_url}/api/todos/`, body);
  }
  // update todo
  updateToDo(id: number, body: {title: string, description: string, status: string}): Observable<any> {
    return this.http.patch(`${environment.base_url}/api/todos/${id}/update-status`, body);
  }
  // delete todo
  deleteToDo(id: string): Observable<any> {
    return this.http.delete(`${environment.base_url}/api/todos/${id}`);
  }
  // get list
  listToDos(): Observable<any> {
    return this.http.get(`${environment.base_url}/api/todos`);
  }
}
