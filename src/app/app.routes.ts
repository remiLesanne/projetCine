import { Routes } from '@angular/router';
import {Home} from './home/home';
import {MoviesList} from './movies-list/movies-list';
import {Admin} from './admin/admin';
import {AddMovie} from './add-movie/add-movie';
import {EditMovie} from './edit-movie/edit-movie';
import { Inscription } from './user/inscription/inscription';
import { Connexion } from './user/connexion/connexion';
import {AccountUser} from './account-user/account-user';

export const routes: Routes = [
  { path: '', component: Home},
  { path: 'movies', component: MoviesList},
  { path: 'admin', component: Admin},
  { path: 'AddMovie', component: AddMovie},
  { path: 'edit-movie/:id', component: EditMovie},
  { path: 'inscription', component: Inscription},
  { path: 'connexion', component: Connexion},
  { path: 'account/:id', component: AccountUser}
];
