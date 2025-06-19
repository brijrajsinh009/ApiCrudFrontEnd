import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';
import { AddBook } from './add-book/add-book';
import { EditBook } from './edit-book/edit-book';
import { NotFound404 } from './not-found-404/not-found-404';
import { Register } from './register/register';
import { PracticeState } from './practice-state/practice-state';
import { Practice } from './practice/practice';
import { Animation } from './animation/animation';
import { PracticeState2 } from './practice-state2/practice-state';

export const routes: Routes = [
  { path: '', component: Dashboard, data: { animation: 'Home' } },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard, data: { animation: 'Home' } },
  { path: 'add', component: AddBook, data: { animation: 'About' } },
  { path: 'edit/:id', component: EditBook, data: { animation: 'About' } },
  { path: 'register', component: Register },
  {
    path: 'practice', component: Practice, data: { animation: 'Contact' }, children: [
      {
        path: 'child',
        component: PracticeState2
      }
    ]
  },
  { path: 'animations', component: Animation },
  { path: '**', component: NotFound404 },
];
