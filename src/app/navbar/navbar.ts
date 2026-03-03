import { Component, input, inject, HostListener } from '@angular/core';
import { TitleCasePipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { UsersApi } from '../services/users-api';
import { User } from '../models/user';


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

  private readonly usersApi = inject(UsersApi);
  currentUserId: number = 1;
  users: User[] = []
  hidden = false;
  private lastScrollTop = 0;


  ngOnInit(): void {
    this.usersApi.getUsers().subscribe(users => this.users = users);
  };

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || 0;
    const delta = currentScroll - this.lastScrollTop;

    if (Math.abs(delta) < 10) return; // évite le tremblement

    this.hidden = delta > 0;
    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

  }
}
