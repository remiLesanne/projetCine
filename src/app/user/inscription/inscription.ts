import { Component, inject, signal } from '@angular/core';
import { User } from '../../models/user';
import { UsersApi } from '../../services/users-api';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  imports: [FormsModule],
  templateUrl: './inscription.html',
  styleUrl: './inscription.scss',
})
export class Inscription {

  private readonly usersApi = inject(UsersApi);
  private readonly router = inject(Router);

  user = signal<User>({
    id: undefined,
    firstName: '',
    lastName: '',
    age: 0,
    email: '',
    points: 0
  })

  addUser() : void {
    this.usersApi.addUser(this.user()).subscribe(() => this.router.navigate(['/']));
  }
}
