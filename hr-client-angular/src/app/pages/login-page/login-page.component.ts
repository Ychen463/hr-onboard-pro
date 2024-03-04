import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import * as AuthSelectors from '../../store/auth/auth.selectors';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  username: string = '';
  password: string = '';
  authStateSubscription: Subscription | undefined;
  constructor(
    private authService: AuthService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to the auth state
    this.authStateSubscription = this.store
      .select(AuthSelectors.selectIsLoggedIn)
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          // If already logged in, redirect to the hiring page
          this.router.navigate(['/hiring']);
        }
      });
  }

  onLogin(username: string, password: string) {
    this.authService.login(username, password);
  }

  ngOnDestroy(): void {
    // Unsubscribe when the component is destroyed
    if (this.authStateSubscription) {
      this.authStateSubscription.unsubscribe();
    }
  }
}
