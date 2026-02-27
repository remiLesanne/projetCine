import { Component, inject, signal } from '@angular/core';
import { User } from '../../models/user';
import { UsersApi } from '../../services/users-api';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  imports: [FormsModule],
  templateUrl: './connexion.html',
  styleUrl: './connexion.scss',
})
export class Connexion {
  private readonly usersApi = inject(UsersApi);
  private readonly router = inject(Router);

  emailUser = '';
  password = '';

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    this.usersApi.connexion(this.emailUser).subscribe(user => {
      console.log(user);
      if (user?.id) {
        this.router.navigate(['/']);
      }
    });
  }

}
