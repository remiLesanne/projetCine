import { Component, inject, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Movie } from '../models/movie';
import { FormsModule, NgForm } from '@angular/forms';
import { MoviesApi } from '../services/movies-api';

/**
 * Composant AddMovie
 * Ce composant permet d'ajouter un nouveau film à la base de données
 */
@Component({
  selector: 'app-add-movie', // Sélecteur HTML pour utiliser ce composant
  imports: [
    FormsModule,   // Module nécessaire pour la liaison bidirectionnelle (ngModel) dans le formulaire
    CommonModule,  // Module nécessaire pour les directives structurelles (*ngIf, *ngFor, etc.)
  ],
  templateUrl: './add-movie.html',  // Template HTML associé
  styleUrl: './add-movie.scss',     // Styles CSS/SCSS associés
})
export class AddMovie {
  // Référence au formulaire pour accéder à sa validation
  @ViewChild('f') form?: NgForm;

  // Injection du service MoviesApi pour communiquer avec l'API backend
  // 'inject()' est la nouvelle façon d'injecter des dépendances dans Angular (standalone)
  private readonly moviesApi = inject(MoviesApi);

  // Injection du Router pour naviguer entre les pages après l'ajout du film
  private readonly router = inject(Router);

  // Messages de feedback
  errorMessage: string = '';
  successMessage: string = '';
  isSubmitting: boolean = false;

  /**
   * Objet movie : représente le nouveau film à ajouter
   * Initialisé avec des valeurs par défaut vides ou undefined
   * Cet objet sera lié au formulaire dans le template HTML via ngModel
   */
  movie: Movie = {
    title: '',
    director: '',
    releaseDate: new Date(),
    synopsis: '',
    id: undefined,
    rate: undefined,
    image: undefined
  }

  /**
   * Méthode addMovie()
   *
   * Cette méthode est appelée lorsque l'utilisateur soumet le formulaire d'ajout de film.
   * Elle valide d'abord le formulaire, puis envoie les données à l'API si tout est correct.
   */
  addMovie(): void {
    // Réinitialiser les messages
    this.errorMessage = '';
    this.successMessage = '';

    // Vérifier si le formulaire existe et est valide
    if (!this.form) {
      this.errorMessage = 'Erreur : formulaire non initialisé.';
      return;
    }

    // Si le formulaire est invalide, marquer tous les champs comme touched
    // pour afficher toutes les erreurs
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        this.form?.controls[key].markAsTouched();
      });

      this.errorMessage = 'Veuillez corriger les erreurs dans le formulaire avant de continuer.';

      // Faire défiler vers le haut pour voir le message d'erreur
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Le formulaire est valide, on peut soumettre
    this.isSubmitting = true;

    // Appel de l'API pour ajouter le film
    this.moviesApi.addMovie(this.movie).subscribe({
      // Callback de succès : quand le film est ajouté avec succès
      next: () => {
        this.successMessage = 'Film ajouté avec succès !';
        this.isSubmitting = false;

        // Redirection après un court délai pour afficher le message
        setTimeout(() => {
          this.router.navigate(['/movies']);
        }, 1000);
      },
      // Callback d'erreur : si l'ajout échoue
      error: (err) => {
        this.errorMessage = 'Erreur lors de l\'ajout du film. Veuillez réessayer.';
        this.isSubmitting = false;
        console.error('Erreur lors de l\'ajout du film:', err);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // Propriété today : contient la date actuelle au format ISO (YYYY-MM-DD)
  // Utilisée pour limiter la date de sortie à aujourd'hui ou avant dans le formulaire
  today: string = new Date().toISOString().split('T')[0];


}
