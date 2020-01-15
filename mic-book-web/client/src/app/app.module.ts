import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BookListComponent} from './component/book-list/book-list.component';
import {MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BookEditComponent} from './component/book-edit/book-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './component/login/login.component';
import {MatIconModule} from "@angular/material/icon";
import {LogoutComponent} from './component/logout/logout.component';
import {MatMenuModule} from "@angular/material/menu";
import {RegistrationComponent} from './component/registration/registration.component';
import {AccountDetailsComponent} from './component/account-details/account-details.component';
import {MyIntreceptorService} from "./service/intreceptor/my-intreceptor.service";
import {MatSelectModule} from "@angular/material/select";
import {SearchListComponent} from './component/search-list/search-list.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {SearchResultComponent} from './component/search-result/search-result.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { BorrowListComponent } from './component/borrow-list/borrow-list.component';
import { BookBorrowComponent } from './component/book-borrow/book-borrow.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookEditComponent,
    HeaderComponent,
    LoginComponent,
    LogoutComponent,
    RegistrationComponent,
    AccountDetailsComponent,
    SearchListComponent,
    SearchResultComponent,
    UserListComponent,
    BorrowListComponent,
    BookBorrowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: MyIntreceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
