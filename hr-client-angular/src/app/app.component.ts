import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'hr-client-angular';
  constructor(private store: Store) {}

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const authData = JSON.parse(userData);
      // Dispatch an action to rehydrate the auth state
      this.store.dispatch(AuthActions.rehydrateauth({ user: authData }));
    }
  }
}
