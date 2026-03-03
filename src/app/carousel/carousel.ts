import {Component, input, OnInit, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Movie} from '../models/movie';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
})
export class Carousel implements OnInit, OnDestroy {
  movies = input.required<Movie[]>();

  // Films dupliqués pour l'effet infini
  displayedMovies: Movie[] = [];

  private animationId?: number;
  private scrollPosition = 0;
  private readonly scrollSpeed = 0.5; // Pixels par frame (ajustable)

  ngOnInit() {
    // Tripler la liste des films pour créer l'effet de boucle infinie
    const moviesList = this.movies();
    this.displayedMovies = [...moviesList, ...moviesList, ...moviesList];

    // Démarrer l'animation de défilement
    this.startScrolling();
  }

  ngOnDestroy() {
    // Arrêter l'animation pour éviter les fuites mémoire
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private startScrolling() {
    const animate = () => {
      this.scrollPosition += this.scrollSpeed;

      const track = document.querySelector('.carousel-track') as HTMLElement;
      if (track) {
        // Calculer la largeur d'un set de films (1/3 du total car triplé)
        const trackWidth = track.scrollWidth / 3;

        // Réinitialiser la position quand on atteint la fin du premier set
        if (this.scrollPosition >= trackWidth) {
          this.scrollPosition = 0;
        }

        // Appliquer la transformation
        track.style.transform = `translateX(-${this.scrollPosition}px)`;
      }

      this.animationId = requestAnimationFrame(animate);
    };

    this.animationId = requestAnimationFrame(animate);
  }
}
