import {Component, inject} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {MovieCard} from "../home/movie-card/movie-card";
import {MoviesApi} from '../services/movies-api';
import {Observable} from 'rxjs';
import {Movie} from '../models/movie';

@Component({
  selector: 'app-home-princpipal',
    imports: [
        AsyncPipe,
        MovieCard
    ],
  templateUrl: './home-princpipal.html',
  styleUrl: './home-princpipal.scss',
})
export class HomePrincpipal {
  private readonly moviesApi = inject(MoviesApi);

  movies$: Observable<Movie[]> = this.moviesApi.getMovies()
}
