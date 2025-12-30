import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../../core/services/account-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService = inject(AccountService);
  protected creds: any = {};

  login() {
    this.accountService.login(this.creds).subscribe({
      next: result => {
        console.log(result);
        this.creds = {};
      },
      error: error => alert(error.message)
    })
  }

  // login() {
  //   this.loading.set(true);
  //   this.accountService.login(this.creds).subscribe({
  //     next: () => {
  //       this.router.navigateByUrl('/members');
  //       this.toast.success('Logged in successfully');
  //       this.creds = {};
  //     },
  //     error: error => {
  //       this.toast.error(error.error);
  //     },
  //     complete: () => this.loading.set(false)
  //   })
  // }

  logout() {
    this.accountService.logout();
  }  
}
