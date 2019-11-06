import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookEditComponent } from './book-edit/book-edit.component'

const routes: Routes = [
  { path: '', redirectTo: '/book-list', pathMatch: 'full' },
  {
    path: 'book-list',
    component: BookListComponent
  },
  {
    path: 'book-add',
    component: BookEditComponent
  },
  {
    path: 'book-edit/:id',
    component: BookEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
