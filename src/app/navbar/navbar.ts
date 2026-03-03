import { Component, input, inject } from '@angular/core';
import { TitleCasePipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [
    TitleCasePipe,
    RouterLink,
    CommonModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})

export class Navbar {
  title = input.required<string>();

  private readonly router = inject(Router);
  readonly auth = inject(AuthService);

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
