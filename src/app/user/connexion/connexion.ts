import { Component, inject, signal } from '@angular/core';
import { User } from '../../models/user';
import { UsersApi } from '../../services/users-api';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from '../../services/toast';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-connexion',
  imports: [FormsModule],
  templateUrl: './connexion.html',
  styleUrl: './connexion.scss',
})
export class Connexion {
  private readonly usersApi = inject(UsersApi);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  emailUser = '';
  password = '';

  connexion(): void {
    if (!this.emailUser || !this.emailUser.includes('@')) {
      this.toast.err("L'email est invalide !", "Erreur")
      return;
    }

    if (!this.password || this.password.length === 0) {
      this.toast.err("Le mot de passe n'a pas été renseigné !", "Mot de passe");
      return;
    }

    this.usersApi.connexion(this.emailUser).subscribe({
      next: (user) => {
        console.log(user);
        this.toast.ok("Bienvenue sur votre espace " + user.firstName + " " + user.lastName, "Authentification")
        this.router.navigate(['/']);
      },
      error: () => {
        this.toast.err("Erreur lors de la connexion", "Erreur");
      }
    })
  }

}
