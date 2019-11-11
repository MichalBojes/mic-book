import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BookListComponent} from './book-list/book-list.component';
import {BookEditComponent} from './book-edit/book-edit.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from "./logout/logout.component";
import {AuthInterceptorService} from "./service/authIntreceptor/auth-interceptor.service";

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
