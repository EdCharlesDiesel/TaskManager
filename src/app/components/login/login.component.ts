import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { LoginViewModel } from '../../models/login-view-model';
import { LoginService } from '../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginViewModel: LoginViewModel = new LoginViewModel();
  loginError: string = "";
  userId: any;
  loginForm: FormGroup | any;
  showPassword = true;

  private unsubscribe$ = new Subject<void>();

  getUsername() {
    return this.loginForm.get('username');
  }

  getPassword() {
    return this.loginForm.get('password');
  }
  constructor(private loginService: LoginService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _authenticationSvc: AuthenticationService,
    private formBuilder: FormBuilder,
    private customValidatorsService: CustomValidatorsService) {
  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    }, {
      validators: [
        this.customValidatorsService.compareValidator("confirmPassword", "password")
      ]
    });
  };

  onloginClick() {

    //Display current form value

    console.log(this.loginForm);

    if (this.loginForm.valid) {
      const returnUrl = this._route.snapshot.queryParamMap.get('returnUrl') || '/';
      this._authenticationSvc.login(this.loginForm.value)
        .subscribe(
          () => {
            // this.setShoppingCart();
            // this.setWishlist();
            // this._router.navigate([returnUrl]);

              this._router.navigate(["/employee", "tasks"]);

          },
          () => {
            this.loginForm.reset();
            this.loginForm.setErrors({
              invalidLogin: true
            });
          });
    }
  }

  // onLoginClick(event: any) {
  //   this._authenticationSvc.login()

  // this.loginService.Login(this.loginViewModel).subscribe(
  //   (response) =>
  //   {
  //     if (this.loginService.currentUserRole == "Admin")
  //     {
  //       this.router.navigate(["/admin", "dashboard"]);
  //     }
  //     else
  //     {
  //       this.router.navigate(["/employee", "tasks"]);
  //     }
  //   },
  //   (error) =>
  //   {
  //     console.log(error);
  //     this.loginError = "Invalid Username or Password";
  //   },
  //  );
  // }

}

