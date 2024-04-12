import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable} from "rxjs";
import { Event } from '../models/event.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private url="http://localhost:8080/api/events"
  constructor(private http:HttpClient) { }

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(this.url);
  }

  get(id: any): Observable<Event> {
    return this.http.get<Event>(`${this.url}/${id}`);
  }

  create(data: any): Observable<any> {
    const jwt = localStorage.getItem('token');
    if (!jwt) {
      console.error('JWT not found');
      return new Observable(observer => {
        observer.error('JWT not found');
        observer.complete();
      });
    }
    const jwtPayload = JSON.parse(atob(jwt.split('.')[1]));
    const userId = jwtPayload.user_id;
    const headers = new HttpHeaders().set('User-ID', userId);
    return this.http.post(`${this.url}/add`, data, { headers });
  }

  update(data: any): Observable<any> {
    return this.http.put(this.url, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  getEvent(id: any): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.url}/${id}`);
  }
}
