import { LoginService } from './login.service';
import { LoginViewModel } from './login-view-model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginViewModel: LoginViewModel = new LoginViewModel();
  loginError: string = '';

  constructor(private loginSvc: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  onLoginClick(event: any) {
    this.loginSvc.Login(this.loginViewModel).subscribe(
      (response: any) => {
        this.router.navigateByUrl('/dashboard');
      },
      (error: any) => {
        console.log(error)
        this.loginError = 'Invalid username or password';
      }
    );
  }
}
