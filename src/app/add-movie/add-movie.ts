import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Movie } from '../models/movie';
import { FormsModule } from '@angular/forms';
import { MoviesApi } from '../services/movies-api';

/**
 * Composant AddMovie
 * Ce composant permet d'ajouter un nouveau film à la base de données
 */
@Component({
  selector: 'app-add-movie', // Sélecteur HTML pour utiliser ce composant
  imports: [
    FormsModule,   // Module nécessaire pour la liaison bidirectionnelle (ngModel) dans le formulaire
    RouterLink     // Directive pour créer des liens de navigation
  ],
  templateUrl: './add-movie.html',  // Template HTML associé
  styleUrl: './add-movie.scss',     // Styles CSS/SCSS associés
})
export class AddMovie {
  // Injection du service MoviesApi pour communiquer avec l'API backend
  // 'inject()' est la nouvelle façon d'injecter des dépendances dans Angular (standalone)
  private readonly moviesApi = inject(MoviesApi);

  // Injection du Router pour naviguer entre les pages après l'ajout du film
  private readonly router = inject(Router);

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
   *
   * Fonctionnement :
   * 1. Elle appelle la méthode addMovie() du service MoviesApi en lui passant l'objet movie
   * 2. Cette méthode du service retourne un (flux de données asynchrone)
   * 3. On s'abonne à cet Observable avec .subscribe() pour être notifié quand l'opération est terminée
   * 4. Quand l'ajout est réussi (callback dans subscribe), on redirige l'utilisateur vers la page '/movies'
   *    en utilisant this.router.navigate(['/movies'])
   *
   * Note : Si l'ajout échoue, aucune gestion d'erreur n'est implémentée ici.
   * Il serait bon d'ajouter un second paramètre à subscribe() pour gérer les erreurs.
   */
  addMovie(): void {
    // Appel de l'API pour ajouter le film
    this.moviesApi.addMovie(this.movie).subscribe(
      // Callback de succès : quand le film est ajouté avec succès
      () => this.router.navigate(['/movies'])  // Redirection vers la liste des films
    );
  }
}
