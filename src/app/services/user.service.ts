import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

const baseUrl = 'http://localhost:8080/api/auth';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  isAuthenticated: boolean = false;
  roles : any;
  username : any;
  accessToken!: string;
  userId!: string;

  // readonly CryptoJS = require('crypto-js');
  // readonly secretKey = 'scscsccscsytuytucc';

  constructor(private http: HttpClient, private router: Router) { }

  signUp(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/signup`, data);
  }

  public signIn(username: string, password: string) {
    let loginForm = { username, password };
    return this.http.post(`${baseUrl}/signin`, loginForm);
  }

  loadProfile(data: any){
    this.isAuthenticated = true;
    this.accessToken = data['access-token'];
    this.username = data['username'];
    this.roles = data['roles'];
    // const encryptedJwt = CryptoJS.AES.encrypt(this.accessToken, this.secretKey).toString();
    // localStorage.setItem('access-token', this.accessToken);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }

  storeUserId(userId: string) {
    this.userId = userId;
    localStorage.setItem('userId', userId);
  }

  getUserId() {
    return localStorage.getItem('userId')
  }

  getToken() {
    return localStorage.getItem('token')
  }
  
  isLogedIn() : boolean {
    const token = localStorage.getItem('token');
    if (token) {
        return true;
    } else {
        return false;
    }
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['sign-in']);
  }

}
