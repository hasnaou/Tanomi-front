import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'ajv/dist/vocabularies/applicator/dependencies';
import { UserService } from 'src/app/services/user.service';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  formLogin!:FormGroup;
  accessToken!: string;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  Login() {
    let username = this.formLogin.value.username;
    let password = this.formLogin.value.password;
    this.userService.signIn(username, password).subscribe({
      next: (data: any) => {
        console.log('Sign-in successful:', data);
        this.userService.storeToken(data.accessToken);
        this.userService.loadProfile(data);
        console.log(data.accessToken);
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
