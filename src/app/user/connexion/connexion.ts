import { Component, inject } from '@angular/core';
import { UsersApi } from '../../services/users-api';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-connexion',
  imports: [FormsModule, RouterLink],
  templateUrl: './connexion.html',
  styleUrl: './connexion.scss',
})
export class Connexion {
  private readonly usersApi = inject(UsersApi);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly auth = inject(AuthService);

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
        this.auth.login(user);
        this.toast.ok("Bienvenue sur votre espace " + user.firstName + " " + user.lastName, "Authentification")
        this.router.navigate(['/account/' + user.id]);
      },
      error: () => {
        this.toast.err("Erreur lors de la connexion", "Erreur");
      }
    })
  }

}
