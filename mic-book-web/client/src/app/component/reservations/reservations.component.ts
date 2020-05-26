import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {UserService} from "../../service/user/user.service";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

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

  goToEdit(login) {
    if (this.loginService.isUserAdmin()) {
      this.router.navigate(['borrow-list/' + login]);
    }
  }

}
