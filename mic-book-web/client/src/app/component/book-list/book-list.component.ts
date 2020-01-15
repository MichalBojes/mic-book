import {Component, OnInit} from '@angular/core';
import {BookService} from '../../service/book/book.service';
import {Router} from "@angular/router";
import {Book} from "../../model/book";
import {AuthenticationService} from "../../service/authentication/authentication.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: Array<any>;

  constructor(
    private bookService: BookService,
    private router: Router,
    private loginService: AuthenticationService) {
  }

  ngOnInit() {
    this.bookService.getAll().subscribe(data => {
      this.books = data;
    });
  }

  goToEdit(id, available) {
    if (this.loginService.isUserAdmin()) {
      this.router.navigate(['/book-edit/' + id]);
    } else if (available > 0){
      this.router.navigate(['/book-borrow/' + id]);
    }
  }
}
