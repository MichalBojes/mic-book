import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BookListComponent} from './book-list/book-list.component';
import {MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BookEditComponent} from './book-edit/book-edit.component';
import {FormsModule} from '@angular/forms';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './login/login.component';
import {MatIconModule} from "@angular/material/icon";
import {LogoutComponent} from './logout/logout.component';
import {MatMenuModule} from "@angular/material/menu";
import {BasicAuthInterceptorService} from './service/authIntreceptor/basic-auth-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookEditComponent,
    HeaderComponent,
    LoginComponent,
    LogoutComponent
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
    MatMenuModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
