import { Observable } from 'rxjs';
import { LoginViewModel } from './login-view-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserName: string | null = null;

  constructor(private httpClient: HttpClient) { }

  public Login(loginViewModel: LoginViewModel): Observable<any> {
    return this.httpClient.post<any>('/Authenticate', loginViewModel, { responseType: 'json' })
    .pipe(map(
      (user)=>{
        if(user){
          this.currentUserName = user.UserName;
        }

        return user;
      }
    ))
  }

  public Logout(){
    this.currentUserName =null;
  }
}
