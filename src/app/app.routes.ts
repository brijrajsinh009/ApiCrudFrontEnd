import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';
import { AddBook } from './add-book/add-book';
import { EditBook } from './edit-book/edit-book';

export const routes: Routes = [
    { path: '', component: Dashboard },
    { path: 'login', component: Login },
    { path: 'dashboard', component: Dashboard },
    { path: 'add', component: AddBook },
    { path: 'edit/:id', component: EditBook },
  ];
