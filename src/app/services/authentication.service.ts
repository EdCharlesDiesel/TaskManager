import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData = new BehaviorSubject<User>(new User());
   oldUserId;

  constructor(
    private http: HttpClient) {
    this.oldUserId = JSON.parse(localStorage.getItem('userId') || '{}');

  }

  login(user: User) {
    return this.http.post<any>('https://localhost:5000/api/login', user)
      .pipe(map((response: any) => {
        if (response && response.token) {
          this.oldUserId = JSON.parse(localStorage.getItem('userId') || '{}');
          localStorage.setItem('authToken', response.token);
          this.setUserDetails();
          localStorage.setItem('userId', response.userDetails.userId);
        }

        return response;
      }));
  }

  setUserDetails() {
    if (localStorage.getItem('authToken')) {
      const userDetails = new User();
      const decodeUserDetails = JSON.parse(atob(localStorage.getItem('authToken')!.split('.')[1]));

      userDetails.userId = decodeUserDetails.userid;
      userDetails.username = decodeUserDetails.sub;
      userDetails.userTypeId = Number(decodeUserDetails.userTypeId);
      userDetails.isLoggedIn = true;

      this.userData.next(userDetails);
    }
  }

  logout() {
    localStorage.clear();
    this.resetSubscription();
    this.setTempUserId();
  }

  setTempUserId() {
    if (!localStorage.getItem('userId')) {
      const tempUserID = this.generateTempUserId();
      localStorage.setItem('userId', tempUserID.toString());
    }
  }

  generateTempUserId() {
    return Math.floor(Math.random() * (99999 - 11111 + 1) + 12345);
  }

  resetSubscription() {
    this.userData.next(new User());
  }
}
