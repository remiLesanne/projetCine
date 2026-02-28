import {Component, input} from '@angular/core';
import {TitleCasePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import { AccountUser } from '../account-user/account-user';
import { User } from '../models/user';
import { UsersApi } from '../services/users-api';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';


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
  ngOnInit(): void {
    this.usersApi.getUsers().subscribe(users => this.users = users);
    };
  //@Input({ required: true }) title! : string
}
