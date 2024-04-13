import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url="http://localhost:8080/api/tasks"

  constructor(private http:HttpClient, private userService: UserService) { }

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
    return this.http.post(`${this.url}/add`, data, { headers });
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.url}/delete/${id}`);
  }

  getAllToDo(id: any): Observable<Task[]> {
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
    return this.http.get<Task[]>(`${this.url}/taskToDo/${id}`, { headers })
  }

  getAllInProgress(id: any): Observable<Task[]> {
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
    return this.http.get<Task[]>(`${this.url}/taskInProgress/${id}`, { headers })
  }

  getAllDone(id: any): Observable<Task[]> {
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
    return this.http.get<Task[]>(`${this.url}/taskDone/${id}`, { headers })
  }

  updateTaskState(id: number, newState: string): Observable<any> {
    const url = `http://localhost:8080/api/tasks/edit/${id}/state`;
    return this.http.put(url, { state: newState });
  }
  
  
}
