import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BookListComponent} from './component/book-list/book-list.component';
import {BookEditComponent} from './component/book-edit/book-edit.component';
import {LoginComponent} from './component/login/login.component';
import {LogoutComponent} from "./component/logout/logout.component";
import {AuthInterceptorService} from "./service/authIntreceptor/auth-interceptor.service";
import {RegistrationComponent} from "./component/registration/registration.component";
import {AccountDetailsComponent} from "./component/account-details/account-details.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/book-list',
    pathMatch: 'full'
  },
  {
    path: 'book-list',
    component: BookListComponent
  },
  {
    path: 'book-add',
    component: BookEditComponent,
    canActivate: [AuthInterceptorService]
  },
  {
    path: 'book-edit/:id',
    component: BookEditComponent,
    canActivate: [AuthInterceptorService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthInterceptorService]
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'myAccount',
    component: AccountDetailsComponent,
    canActivate: [AuthInterceptorService]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
