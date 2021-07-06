import { LoginService } from './admin/login/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  loginService: any;

  constructor(public _loginSvc:LoginService){

  }
}
