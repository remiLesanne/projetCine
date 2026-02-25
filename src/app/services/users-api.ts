import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersApi {
  private readonly httpClient = inject(HttpClient);
  private readonly url = "http://localhost:8080/users"

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.url, user);
  }
}
