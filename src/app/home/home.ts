import { Component } from '@angular/core';
import {inject} from '@angular/core';
import {MoviesApi} from '../services/movies-api';
import {Observable} from 'rxjs';
import {Movie} from '../models/movie';
import {AsyncPipe, DatePipe} from '@angular/common';
import {MovieCard} from './movie-card/movie-card';
import {Carousel} from '../carousel/carousel';

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe,
    DatePipe,
    MovieCard,
    Carousel
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly moviesApi = inject(MoviesApi);

  movies$: Observable<Movie[]> = this.moviesApi.getMovies()

}
