import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BookListComponent} from './component/book-list/book-list.component';
import {MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BookEditComponent} from './component/book-edit/book-edit.component';
import {FormsModule} from '@angular/forms';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './component/login/login.component';
import {MatIconModule} from "@angular/material/icon";
import {LogoutComponent} from './component/logout/logout.component';
import {MatMenuModule} from "@angular/material/menu";
import {BasicAuthInterceptorService} from './service/authIntreceptor/basic-auth-interceptor.service';
import { RegistrationComponent } from './component/registration/registration.component';
import { AccountDetailsComponent } from './component/account-details/account-details.component';


@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookEditComponent,
    HeaderComponent,
    LoginComponent,
    LogoutComponent,
    RegistrationComponent,
    AccountDetailsComponent
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
