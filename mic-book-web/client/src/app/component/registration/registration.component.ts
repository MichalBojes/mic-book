import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication/authentication.service";
import { UserService} from "../../service/user/user.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  invalidLogin = false
  invalidRegistration = false
  user = new User("", "", "", "", "", "", "", "U");

  constructor(private router: Router,
              private userservice: UserService,
              private loginservice: AuthenticationService) {
  }

  ngOnInit() {
  }

  checkRegistration() {
    this.userservice.createUser(this.user).subscribe(
      data => {
        this.invalidRegistration = false;
        this.loginservice.authenticate(this.user.username, this.user.password).subscribe(
          data => {
            this.router.navigate([''])
            this.invalidLogin = false
          },
          error => {
            this.router.navigate(['/login'])
            this.invalidLogin = true
          }
        )
      },
      error => {
        this.invalidRegistration = true
      }
    );
  }
}
