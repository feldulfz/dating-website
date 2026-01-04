import { inject, Injectable } from '@angular/core';
import { AccountService } from './account-service';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private accountService = inject(AccountService);

  init() {
    const userJson = localStorage.getItem('user');
    if (!userJson) return of(null);
    const user = JSON.parse(userJson);
    this.accountService.currentUser.set(user);
    
    return of(null);  
  }  

  // init() {
  //   return this.accountService.refreshToken().pipe(
  //     tap(user => {
  //       if (user) {
  //         this.accountService.setCurrentUser(user);
  //         this.accountService.startTokenRefreshInterval();
  //       }
  //     })
  //   )
  // }
}
