import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {ReservationsService} from "../../service/reservations/reservations.service";

@Component({
  selector: 'app-borrow-list',
  templateUrl: './borrow-list.component.html',
  styleUrls: ['./borrow-list.component.scss']
})
export class BorrowListComponent implements OnInit {

  reservations: Array<any>;

  constructor(
    private userService: UserService,
    private router: Router,
    private loginService: AuthenticationService,
    private reservationsService: ReservationsService
  ) {
  }

  ngOnInit() {
    this.reservationsService.getAllReservations(this.loginService.getUserLogin()).subscribe(data => {
      this.reservations = data;
    });
  }

  endReservation(reservation) {
    if (this.loginService.isUserAdmin()) {
      this.reservationsService.endReservation(reservation);
    }
  }

}
