import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsersApi } from '../services/users-api';
import { User } from '../models/user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-user',
  imports: [RouterLink, FormsModule],
  templateUrl: './account-user.html',
  styleUrl: './account-user.scss',
})
export class AccountUser implements OnInit {
  user: User = {
    id: undefined,
    firstName: '',
    lastName: '',
    age: undefined,
    email: '',
    points: ''
  }

  private readonly userApi = inject(UsersApi);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly cdr = inject(ChangeDetectorRef); 

  userId: number = 0;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.userId = Number(idParam);

      this.userApi.getUserById(this.userId).subscribe({
        next: (data) => {
          this.user = data;
          this.cdr.detectChanges(); 
        },
        error: (err) => console.error(err)
      });
    }
  }

  updateUser(): void {
    this.userApi.updateUser(this.userId, this.user).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },    
    });
  }
}