import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class RouterLoggerService {

  BASE_URL = 'https://localhost:5001';
  currentUserName = '';

  // constructor(private httpBackend: HttpBackend, private httpClient: HttpClient) {
  // }

  // public log(logMsg: string): Observable<any> {
  //   this.httpClient = new HttpClient(this.httpBackend);
  //   return this.httpClient.post(this.BASE_URL + "/api/routerlogger", logMsg,
  //     { headers: new HttpHeaders().set("content-type", "text/plain") }
  //   );
  // }
}
