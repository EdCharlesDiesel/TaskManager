import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RouterLoggerService {

  currentUserName: string = '';

  constructor(private httpBackend: HttpBackend, private httpClient: HttpClient) {
  }

  public log(logMsg: string): Observable<any> {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.post("/api/routerlogger", logMsg,
      { headers: new HttpHeaders().set("content-type", "text/plain") }
    );
  }
}
