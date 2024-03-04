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
  constructor(
    private http: HttpClient,
    private store: Store
  ) {
    this.rehydrateAuth();
  }

  login(username: string, password: string) {
    this.store.dispatch(AuthActions.login());
    this.http.post<LoginResponse>('api/login', { username, password }).subscribe({
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
          // Store user data into local storage as well to rehydrate Store auth
          // Example of setting user data in localStorage after successful login
          localStorage.setItem('user', JSON.stringify({ userId, username, userRole, email }));

          this.store.dispatch(
            AuthActions.loginsuccess({
              user: { userId, username, userRole, email },
            })
          );
        }
      },
      error: (error: ErrorResponse) =>
        this.store.dispatch(AuthActions.loginfailure({ error: error.message || 'Login failed' })),
    });
  }

  // Additional methods like logout could also remove the token from local storage
  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    this.store.dispatch(AuthActions.logout());
  }

  rehydrateAuth() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.store.dispatch(AuthActions.rehydrateauth({ user: user }));
    }
  }
}
