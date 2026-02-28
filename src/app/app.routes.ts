import { Routes } from '@angular/router';
import {Home} from './home/home';
import {MoviesList} from './movies-list/movies-list';
import {Admin} from './admin/admin';
import {AddMovie} from './add-movie/add-movie';
import {EditMovie} from './edit-movie/edit-movie';
import {AccountUser} from './account-user/account-user';

export const routes: Routes = [
  { path: '', component: Home},
  { path: 'movies', component: MoviesList},
  { path: 'admin', component: Admin},
  { path: 'AddMovie', component: AddMovie},
  { path: 'edit-movie/:id', component: EditMovie},
  { path: 'account/:id', component: AccountUser}
];
