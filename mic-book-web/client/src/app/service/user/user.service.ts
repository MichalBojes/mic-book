import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from "../../model/user";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public API = '//localhost:9090';
  public USER_API = this.API + '/users';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getUser(login: string) {
    const link = this.USER_API + '?username=' + login;
    return this.httpClient.get<User>('//localhost:9090/users?username=' + login);
  }

  public deleteUser(user) {
    console.log('testowanko2')
    return this.httpClient.delete<User>(this.USER_API, user);
  }

  public createUser(user) {
    return this.httpClient.post<User>(this.USER_API, user);
  }

  public updateUser(user) {
    console.log('testowanko3')
    return this.httpClient.put<User>(this.USER_API, user);
  }

  public getAllUsers(): Observable<any> {
    return this.httpClient.get('//localhost:9090/users-list');
  }
}
