import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  public API = '//localhost:9090';
  public BORROW_API = this.API + '/borrow';

  constructor(private http: HttpClient) {
  }

  borrowBook(book, login) {
    return this.http.post(this.BORROW_API + '/' + login, book);
  }

  endReservation(book) {
    return this.http.put(this.BORROW_API, book);
  }

  getAllReservations(login): Observable<any> {
    return this.http.get(this.BORROW_API + '/' + login);
  }
}
