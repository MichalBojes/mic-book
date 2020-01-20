import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BookService} from "../../service/book/book.service";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {
  querySearchField: FormControl = new FormControl();

  constructor(private searchService: BookService) {
  }

  ngOnInit() {

}
}
