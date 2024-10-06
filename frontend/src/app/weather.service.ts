import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = 'http://localhost:8000/weather'; // Update if your backend runs on a different host/port

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    const params = new HttpParams().set('city', city);
    return this.http.get<any>(this.apiUrl, { params });
  }
}
