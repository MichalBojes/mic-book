import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {User} from "../../model/user";
import {Subscription} from "rxjs";
import {Location} from '@angular/common';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {

  invalidRegistration = false
  user = new User("", "", "", "", "", "", "", "");
  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userservice: UserService,
              private authservice: AuthenticationService,
              private location: Location,
  ) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      let login;
      if (id && this.authservice.isUserAdmin()) {
        login = id;
      } else {
        login = this.authservice.getUserLogin();
      }
      this.userservice.getUser(login).subscribe(data => {
        this.user = data;
      });
    });
  }

  updateUser() {
    this.userservice.updateUser(this.user).subscribe(
      data => {
        this.invalidRegistration = false;
        this.goBack()
      },
      error => {
        this.invalidRegistration = true
      }
    );
  }

  deleteUser(user) {
    console.log('user deletion')
    this.userservice.deleteUser(user)
    this.goBack()
  }

  goBack() {
    this.location.back();
  }

}
