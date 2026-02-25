import {Component, computed, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {Movie} from '../models/movie';
import {MoviesApi} from '../services/movies-api';
import {DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-movies-list',
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './movies-list.html',
  styleUrl: './movies-list.scss',
})
export class MoviesList implements OnInit {
  private readonly moviesApi = inject(MoviesApi);
  private destroyRef = inject(DestroyRef);
  //movies: Movie[] = [];
  movies = signal<Movie[]>([]);
  moviesC = computed(() => this.movies().length);

  ngOnInit(): void {
    this.moviesApi.getMovies().subscribe(movies => this.movies.set(movies));
  }

  deleteMovie(id: number): void {
    this.moviesApi.deleteMovie(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.movies.update(current => current.filter(film => film.id !== id));
      //this.movies = this.movies.filter(film => film.id !== id);
    });
  }
}
