import {Component, Input, OnInit} from '@angular/core';
import {BookService} from '../../service/book/book.service';
import {Router} from "@angular/router";
import {Book} from "../../model/book";
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: Array<any>;
  allBooks: Array<any>;
  @Input() querySearch?: FormControl;

  constructor(
    private bookService: BookService,
    private router: Router,
    private loginService: AuthenticationService) {
  }

  ngOnInit() {

    this.bookService.getAll().subscribe(data => {
      this.books = data;
      this.allBooks = data;
    });


    this.querySearch.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(query => {
          if (query !== '') {
            return this.bookService.search(query)
          } else {
            this.books = this.allBooks;
          }
        })
      )
      .subscribe(result => {
        if (result.status === 400) {
          this.books = this.allBooks;
          return;
        }
        this.books = result;
      });
  }

  goToEdit(id, available) {
    if (this.loginService.isUserAdmin()) {
      this.router.navigate(['/book-edit/' + id]);
    } else if (available > 0) {
      this.router.navigate(['/book-borrow/' + id]);
    }
  }
}
