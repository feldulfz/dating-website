import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../../core/services/account-service';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService = inject(AccountService);
  protected router = inject(Router);
  private toast = inject(ToastService);
  protected creds: any = {};

  login() {
    this.accountService.login(this.creds).subscribe({
      next: () => {
        this.router.navigateByUrl('/members');
        this.toast.success('Logged in successfully');
        this.creds = {};
      },
      error: error => {
        this.toast.error(error.error);
      }
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
    this.router.navigateByUrl('/');
  }  
}
