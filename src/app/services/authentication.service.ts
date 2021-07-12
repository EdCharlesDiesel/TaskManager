import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  oldUserId;
  userData = new BehaviorSubject<User>(new User());

  constructor(
    private httpClient: HttpClient) {
    this.oldUserId = JSON.parse(sessionStorage.getItem('userId') || '{}');

  }

  login(user: User): any {
    return this.httpClient.post<any>('https://localhost:5001/api/login', user)
      .pipe(map((response: any) => {
        if (response && response.token) {
          this.oldUserId = JSON.parse(sessionStorage.getItem('userId') || '{}');
          sessionStorage.setItem('authToken', response.token);
          this.setUserDetails();
          sessionStorage.setItem('userId', response.userDetails.userId);
        }

        return response;

      }));
  }

  setUserDetails(): void {
    if (sessionStorage.getItem('authToken')) {
      const userDetails = new User();
      const decodeUserDetails = JSON.parse(atob(sessionStorage.getItem('authToken')!.split('.')[1]));

      userDetails.userId = decodeUserDetails.userid;
      userDetails.username = decodeUserDetails.sub;
      userDetails.userTypeId = Number(decodeUserDetails.userTypeId);
      userDetails.isLoggedIn = true;

      this.userData.next(userDetails);
    }
  }

  logout(): void {
    sessionStorage.clear();
    this.resetSubscription();
    this.setTempUserId();
  }

  setTempUserId(): void {
    if (!sessionStorage.getItem('userId')) {
      const tempUserID = this.generateTempUserId();
      sessionStorage.setItem('userId', tempUserID.toString());
    }
  }

  generateTempUserId(): number {
    return Math.floor(Math.random() * (99999 - 11111 + 1) + 12345);
  }

  resetSubscription(): void {
    this.userData.next(new User());
  }
}
