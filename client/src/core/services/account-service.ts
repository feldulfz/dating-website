import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginCreds, User } from '../../types/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  currentUser = signal<User | null>(null);
  // currentUser = signal<any>(null);

  login(creds: LoginCreds) {
    return this.http.post<User>(this.baseUrl + 'account/login', creds).pipe(
      tap(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
      })
    )
  }

  // login(creds: LoginCreds) {
  //   return this.http.post<User>(this.baseUrl + 'account/login', creds,
  //     { withCredentials: true }).pipe(
  //       tap(user => {
  //         if (user) {
  //           this.setCurrentUser(user);
  //           this.startTokenRefreshInterval();
  //         }
  //       })
  //     )
  // }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
