import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {


  invalidRegistration = false
  user = new User("", "", "", "", "", "", "", "");

  constructor(private router: Router,
              private userservice: UserService,
              private authservice: AuthenticationService,
  ) {
  }

  ngOnInit() {
    let login = this.authservice.getUserLogin();
    this.userservice.getUser(login).subscribe(data => {
      this.user = data;
    });
  }

  updateUser() {
    this.userservice.updateUser(this.user).subscribe(
      data => {
        this.invalidRegistration = false;
        this.router.navigate([''])
      },
      error => {
        this.invalidRegistration = true
      }
    );
  }
}
