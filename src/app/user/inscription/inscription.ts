import { Component, inject, signal } from '@angular/core';
import { User } from '../../models/user';
import { UsersApi } from '../../services/users-api';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-inscription',
  imports: [FormsModule, RouterLink],
  templateUrl: './inscription.html',
  styleUrl: './inscription.scss',
})
export class Inscription {

  private readonly usersApi = inject(UsersApi);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly auth = inject(AuthService);

  user = signal<User>({
    id: undefined,
    firstName: '',
    lastName: '',
    age: 0,
    email: '',
    points: 0
  })

  addUser(): void {
    const u = this.user();

    if (!u.firstName || !u.age || !u.lastName || !u.email) {
      this.toast.warn("Veuillez remplir les champs obligatoires", "Formulaire");
      return;
    }
    this.usersApi.addUser(u).subscribe({
      next: (user) => {
        this.toast.ok("Inscription finalisé avec succès !", "Inscription")
        this.auth.login(user);
        this.router.navigate(['/account/' + user.id])
      },
      error: () => {
        this.toast.err("Erreur lors de la création de l'utilisateur", "Erreur")
      }
    })

  }
}
