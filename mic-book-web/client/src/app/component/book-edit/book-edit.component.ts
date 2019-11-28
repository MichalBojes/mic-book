import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../service/book/book.service';
import {Book} from "../../model/book";


@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {
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

  updateBook() {
    this.bookService.updateBook(this.book).subscribe(
      data => {
        this.router.navigate([''])
      }
    );
  }

  deleteBook() {
    this.bookService.remove(this.book.id).subscribe(
      data => {
        this.router.navigate([''])
      }
    );
  }

}
