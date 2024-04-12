import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Role } from 'src/app/enums/role';
import { error } from 'ajv/dist/vocabularies/applicator/dependencies';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  formUser: FormGroup;

  user: User = {
    username: '',
    email: '',
    password: '',
    role: [Role.user]
  }

  constructor(private userService: UserService, private router: Router) {
    this.formUser = new FormGroup({
      username: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
   }

  ngOnInit(): void {
  }

  signUp() {
    if (this.formUser.valid) {
      const userData: User = {
        username: this.formUser.value.username,
        email: this.formUser.value.email,
        password: this.formUser.value.password,
        role: [Role.user]
      };

      this.userService.signUp(userData).subscribe(
        (response: User) => {
          console.log("User signup with success", response);
          this.router.navigate(["/home"]);
        },
        (error) => {
          console.log("Error user signup failed: ", error);
        }
      );
    } else {
      console.log("Error invalid form");
    }
  }

  protected readonly Role = Role;

}
