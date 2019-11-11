import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export class User {
  constructor(
    public id: string,
    public name: string,
    public login: string,
    public password: string,
    public status: string,
  ) {
  }

}

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

  getUsers() {
    console.log("test call");
    return this.httpClient.get<User[]>(this.USER_API);
  }

  public deleteUser(user) {
    return this.httpClient.delete<User>(this.USER_API + "/" + user.id);
  }

  public createUser(user) {
    return this.httpClient.post<User>(this.USER_API, user);
  }
}
