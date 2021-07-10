import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginViewModel } from '../models/login-view-model';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showPassword = true;
  userId: any = null;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.userId = JSON.parse(localStorage.getItem('userId') || '{}');
  }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    this.authenticationService.userData.asObservable()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: User) => {
        this.userId = data.userId;
      });
  }

  login() {
    if (this.loginForm.valid) {
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      this.authenticationService.login(this.loginForm.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          () => {
            this.router.navigate([returnUrl]);
          },
          () => {
            this.loginForm.reset();
            this.loginForm.setErrors({
              invalidLogin: true
            });
          });
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  // BASE_URL ='https://localhost:5001/api';

  // loginViewModel: LoginViewModel = new LoginViewModel();
  // loginError: string = "";

  // constructor(private loginService: LoginService, private router : Router)
  // {
  // }

  // ngOnInit()
  // {
  // }

  // onLoginClick(event: any)
  // {
  //   this.loginService.Login(this.loginViewModel).subscribe(
  //     (response: any) => {
  //       this.router.navigateByUrl(this.BASE_URL + "/dashboard");
  //     },
  //     (error: any) => {
  //       console.log(error);
  //       this.loginError = "Invalid Username or Password";
  //     },
  //   );
  // }

}
