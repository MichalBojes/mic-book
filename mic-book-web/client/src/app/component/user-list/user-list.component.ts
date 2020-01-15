import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {UserService} from "../../service/user/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: Array<any>;

  constructor(
    private userService: UserService,
    private router: Router,
    private loginService: AuthenticationService) {
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  goToEdit(id) {
    if (this.loginService.isUserAdmin()) {
      this.router.navigate(['edit-user/' + id]);
    }
  }

}
