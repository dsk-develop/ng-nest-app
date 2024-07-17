import { Component,inject} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginObj : any = { }
  // loginForm: any;  
  http = inject(HttpClient);
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apiService: ApiService
  ) {}
  ngOnInit():void{
    this.apiService.jwtToken.subscribe((token: any) =>{
      if(token){
        this.router.navigateByUrl('/').then();
      }
    });
  }
  username = '';

  onLogin(): void {
    this.apiService.login(this.email, this.password).subscribe(
      (res) => {
        console.log('Login successful:', res);
        this.router.navigateByUrl('/').then();
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
  showNotification() {
    this.toastr.success('Operation successful!', 'Success', { timeOut: 1000 });
  }
  navigateToRegister() {
      this.router.navigate(['/register']);
  }
}
