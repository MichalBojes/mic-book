import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  public API = '//localhost:9090';
  public AUTH_API = this.API + '/authenticate';
  public ROLE_API = this.API + '/userRole?username=';

  constructor(private httpClient: HttpClient) {
  }

  authenticate(username, password) {
    return this.httpClient.post<any>(this.AUTH_API, {username, password}).pipe(
      map(userData => {
          sessionStorage.setItem('username', username);
          let tokenStr = 'Bearer ' + userData.token;
          sessionStorage.setItem('token', tokenStr);
          this.getUserRole(username);
          return userData;
        }
      )
    );
  }

  getUserRole(username) {
    this.httpClient
      .get<any>(this.ROLE_API + username)
      .subscribe(data => sessionStorage.setItem('role', data.response));
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    return !(user === null)
  }

  isUserAdmin() {
    let role = sessionStorage.getItem('role')
    return role === 'A'
  }

  getUserLogin() {
    let username = sessionStorage.getItem('username')
    return username;
  }

  logOut() {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('role')
  }
}

