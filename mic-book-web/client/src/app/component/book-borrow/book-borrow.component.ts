import { Component, OnInit } from '@angular/core';
import {Book} from "../../model/book";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {BookService} from "../../service/book/book.service";

@Component({
  selector: 'app-book-borrow',
  templateUrl: './book-borrow.component.html',
  styleUrls: ['./book-borrow.component.scss']
})
export class BookBorrowComponent implements OnInit {
  book = new Book(
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "");

  isEdit: boolean;
  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private bookService: BookService
  ) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEdit = true;
        this.bookService.getBook(id).subscribe(data => {
          this.book = data;
        })
      } else {
        this.isEdit = false;
      }
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  borrowBook() {
    this.bookService.borrowBook(this.book).subscribe(
      data => {
        this.router.navigate([''])
      }
    );
  }

}
