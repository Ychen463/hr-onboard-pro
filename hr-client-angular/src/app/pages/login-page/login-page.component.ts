import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import * as AuthSelectors from '../../store/auth/auth.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  username: string = '';
  password: string = '';
  authStateSubscription: Subscription | undefined;
  constructor(
    private authService: AuthService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.authStateSubscription = this.store.select(AuthSelectors.selectAuth).subscribe({
      next: (authState) => {
        console.log('auth state', authState);
      },
    });
  }

  onLogin(username: string, password: string) {
    this.authService.login(this.username, this.password);
  }
}
