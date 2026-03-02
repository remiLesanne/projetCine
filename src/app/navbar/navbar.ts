import {Component, input} from '@angular/core';
import {TitleCasePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import { AccountUser } from '../account-user/account-user';
import { User } from '../models/user';
import { UsersApi } from '../services/users-api';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit, HostListener } from '@angular/core';


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
