import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from './store/auth/auth.actions';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'hr-client-angular';
  showNavigationBar = true;
  constructor(
    private store: Store,
    private router: Router
  ) {
    this.router.events
      .pipe(filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Now it's safe to use NavigationEnd specific properties
        this.showNavigationBar = !event.urlAfterRedirects.endsWith('/login');
      });
  }

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const authData = JSON.parse(userData);
      // Dispatch an action to rehydrate the auth state
      this.store.dispatch(AuthActions.rehydrateauth({ user: authData }));
    }
  }
}
