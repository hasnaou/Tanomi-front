import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private url="http://localhost:8080/api/projects"
  constructor(private http:HttpClient) { }

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url);
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
    const decodedToken = jwtDecode(jwt);
    const userId = decodedToken.user_id;
    if (!userId) {
        console.error('User ID not found in JWT');
        return new Observable(observer => {
          observer.error('User ID not found in JWT');
          observer.complete();
        });
    }
    const headers = new HttpHeaders().set('User-ID', userId.toString());
    return this.http.post(`${this.url}/projectadd`, data, { headers });
  }
}
