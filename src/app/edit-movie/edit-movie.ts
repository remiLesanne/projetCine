import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Movie } from '../models/movie';
import { FormsModule } from '@angular/forms';
import { MoviesApi } from '../services/movies-api';

@Component({
  selector: 'app-edit-movie',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './edit-movie.html',
  styleUrl: './edit-movie.scss',
})
export class EditMovie implements OnInit {
  private readonly moviesApi = inject(MoviesApi);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  movieId: number = 0;
  movie: Movie = {
    title: '',
    director: '',
    releaseDate: new Date(),
    synopsis: '',
    id: undefined,
    rate: undefined,
    image: undefined
  };
  formattedDate: string = '';

  ngOnInit(): void {
    // Récupérer l'ID du film depuis l'URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieId = +id; // Convertir en nombre
      this.loadMovie();
    }
  }

  loadMovie(): void {
    this.moviesApi.getMovieById(this.movieId).subscribe({
      next: (movie) => {
        this.movie = movie;
        // Convertir la date pour l'input type="date"
        if (movie.releaseDate) {
          const date = new Date(movie.releaseDate);
          this.formattedDate = date.toISOString().split('T')[0];
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement du film:', error);
        alert('Erreur lors du chargement du film');
        this.router.navigate(['/movies']);
      }
    });
  }

  onDateChange(dateString: string): void {
    this.movie.releaseDate = new Date(dateString);
  }

  updateMovie(): void {
    this.moviesApi.updateMovie(this.movieId, this.movie).subscribe({
      next: () => {
        alert('Film modifié avec succès!');
        this.router.navigate(['/movies']);
      },
      error: (error) => {
        console.error('Erreur lors de la modification:', error);
        alert('Erreur lors de la modification du film');
      }
    });
  }
}
