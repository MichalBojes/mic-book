import {Component, OnInit} from '@angular/core';
import {BookService} from '../../service/book/book.service';
import {Router} from "@angular/router";
import {Book} from "../../model/book";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: Array<any>;

  constructor(
    private bookService: BookService,
    private router: Router) {
  }

  ngOnInit() {
    this.bookService.getAll().subscribe(data => {
      this.books = data;
    });
  }

  goToEdit(id) {
    this.router.navigate(['/book-edit/' + id]);
  }
}
