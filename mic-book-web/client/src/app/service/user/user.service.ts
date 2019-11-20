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
    console.log(login)
    return this.httpClient.get<User>('//localhost:9090/users?username=admin');
  }

  public deleteUser(user) {
    return this.httpClient.delete<User>(this.USER_API + "/" + user.id);
  }

  public createUser(user) {
    return this.httpClient.post<User>(this.USER_API, user);
  }

  public updateUser(user) {
    return this.httpClient.put<User>(this.USER_API, user);
  }

}
