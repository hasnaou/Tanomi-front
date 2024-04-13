import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { map, catchError  } from 'rxjs/operators';
import { Project } from '../models/project.model';
import { jwtDecode } from 'jwt-decode';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private url="http://localhost:8080/api/projects"
  constructor(private http:HttpClient, private userService: UserService) { }

  getAll(): Observable<Project[]> {
    const userIdStr = this.userService.getUserId();
    if (!userIdStr) {
      console.error('User ID not found in JWT');
      return new Observable(observer => {
        observer.error('User ID not found in JWT');
        observer.complete();
      });
    }
    const userId = parseInt(userIdStr, 10);
    const headers = new HttpHeaders().set('User-ID', userId.toString());
    return this.http.get<Project[]>(`${this.url}/user/project`, { headers });
  }

  create(data: any): Observable<any> {
    const userIdStr = this.userService.getUserId();
    if (!userIdStr) {
      console.error('User ID not found in JWT');
      return new Observable(observer => {
        observer.error('User ID not found in JWT');
        observer.complete();
      });
    }
    const userId = parseInt(userIdStr, 10);
    const headers = new HttpHeaders().set('User-ID', userId.toString());
    return this.http.post(`${this.url}/projectadd`, data, { headers });
  }

  get(id: any): Observable<Project> {
    return this.http.get<Project>(`${this.url}/project/${id}`);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.url}/delete/${id}`);
  }

  // create(data: any): Observable<number> {
  //   const userIdStr = this.userService.getUserId();
  //   if (!userIdStr) {
  //     console.error('User ID not found in JWT');
  //     return throwError('User ID not found in JWT');
  //   }
  
  //   const userId = parseInt(userIdStr, 10);
  //   const headers = new HttpHeaders().set('User-ID', userId.toString());
  
  //   return this.http.post<Project>(`${this.url}/projectadd`, data, { headers }).pipe(
  //     map((response: Project) => {
  //       if (response && response.projectId) {
  //         return response.projectId;
  //       } else {
  //         console.error('Project ID not found in response body');
  //         throw new Error('Project ID not found in response body');
  //       }
  //     }),
  //     catchError((error) => {
  //       console.error('Error creating project:', error);
  //       return throwError('Error creating project');
  //     })
  //   );
  // }
  
}
