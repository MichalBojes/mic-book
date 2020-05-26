import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from "../../model/book";

@Injectable({providedIn: 'root'})
export class BookService {
  public API = '//localhost:9090';
  public BOOK_API = this.API + '/books';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    const link = this.API + '/books/list';
    return this.http.get(link);
  }

  getBook(id: string) {
    const link = '//localhost:9090/books/edit?id=' + id;
    return this.http.get<Book>(link);
  }

  updateBook(book) {
    return this.http.post(this.BOOK_API, book);
  }

  remove(id) {
    return this.http.delete(this.BOOK_API + '?id=' + id);
  }

  search(queryString: string): Observable<any> {
    let URL = this.BOOK_API + '/search?limit=5&query=' + queryString;
    return this.http.get(URL);
  }

}
