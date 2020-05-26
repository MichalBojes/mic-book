import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
              private loginService: AuthenticationService) {
  }

  ngOnInit() {
  }

  redirectToReservationList() {
    this.router.navigate(['/borrow-list/' + this.loginService.getUserLogin()])
  }
}
