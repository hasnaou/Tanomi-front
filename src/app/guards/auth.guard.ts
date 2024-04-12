import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { error } from 'ajv/dist/vocabularies/applicator/dependencies';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  // canActivate() : boolean {
  //   console.log('AuthGuard canActivate() method called');
  //   if(this.userService.isLogedIn()) {
  //     console.log('Navigating to dashboard...');
  //     this.router.navigate(['dashboard']);
  //     return true;
  //   }else {
  //     this.router.navigate(['sign-in']);
  //     return false;
  //   }
  // }

  canActivate(): boolean {
    console.log('AuthGuard canActivate() method called');
    if (this.userService.isLogedIn()) {
      console.log('Navigating to dashboard...');
      return true; // Only return true if the user is logged in
    } else {
      console.log('User not logged in, navigating to sign-in...');
      this.router.navigate(['sign-in']);
      return false; // Return false to prevent navigation
    }
  }
  
}
