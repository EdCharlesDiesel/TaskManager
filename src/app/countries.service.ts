import { Injectable } from '@angular/core';
import { Country } from './country';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService
{
  constructor(private httpClient: HttpClient)
  {
  }

  getCountries(): Observable<Country[]>
  {
    return this.httpClient.get<Country[]>("/api/countries", { responseType: "json" });
  }
}
