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
  results: Array<any>;//[] = [];
  queryField: FormControl = new FormControl();
  options: Array<any>;
  querySearchField: FormControl = new FormControl();

  constructor(private searchService: BookService) {
  }

  ngOnInit() {
    // this.queryField.valueChanges
    //   .pipe(debounceTime(200),
    //     distinctUntilChanged(),
    //     switchMap((query) => this._searchService.search(query)))
    //   .subscribe(result => {
    //     this.results = result;//.json().artists.items;
    //   });

    this.querySearchField.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(query => {
          console.log("wyszukiwanie")
          return this.searchService.search(query)
        })
      )
      .subscribe(result => {
        if (result.status === 400) {
          return;
        }
        this.options = result;
      });
  }
}
