import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class BookService {
  public API = '//localhost:9090';
  public BOOK_API = this.API + '/books';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    const link = this.API + '/' + 'books-list';
    return this.http.get(link);
  }

  get(id: string) {
    const link = this.BOOK_API + '/' + id;
    return this.http.get(link);
  }

  save(book: any): Observable<any> {

    let result: Observable<Object>;
    if (book['href']) {
      result = this.http.put(book.href, book);
    } else {
      result = this.http.post(this.BOOK_API, book);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href,);
  }
}
