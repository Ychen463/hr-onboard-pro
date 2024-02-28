import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AuthActions } from '../store/auth/auth.actions';
import { LoginResponse } from '../interfaces/auth-response';
import { ErrorResponse } from '../interfaces/error-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private store: Store) {}

  login(username: string, password: string) {
    this.store.dispatch(AuthActions.login());
    this.http
      .post<LoginResponse>('api/login', { username, password })
      .subscribe({
        next: (response) => {
          if (response.user.userRole !== 'HR') {
            // Dispatch a failure action if the user is not HR
            this.store.dispatch(
              AuthActions.loginfailure({
                error: 'Access restricted to HR personnel only',
              })
            );
          } else {
            // Store the login token in local storage
            console.log(response);
            localStorage.setItem('jwtToken', response.loginJwtToken);

            // Extract necessary user info and dispatch success action
            const { userId, username, userRole, email } = response.user;
            this.store.dispatch(
              AuthActions.loginsuccess({
                user: { userId, username, userRole, email },
              })
            );
          }
        },
        error: (error: ErrorResponse) =>
          this.store.dispatch(
            AuthActions.loginfailure({ error: error.message || 'Login failed' })
          ),
      });
  }

  // Additional methods like logout could also remove the token from local storage
  logout() {
    localStorage.removeItem('jwtToken');
    this.store.dispatch(AuthActions.logout());
  }
}
