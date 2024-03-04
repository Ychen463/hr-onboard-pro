import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  title = 'hr-client-angular';
  activeRoute: string = '';
  opened = false;

  constructor(
    private _eref: ElementRef,
    private router: Router,
    private store: Store
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setActiveRoute(event.url); // Update active route when navigation ends
      }
    });
  }

  toggleSidebar() {
    this.opened = !this.opened;
  }

  onContainerClicked(event: MouseEvent) {
    if (this.opened && !this._eref.nativeElement.contains(event.target)) {
      this.sidenav.close();
    }
  }
  setActiveRoute(url: string) {
    this.activeRoute = url;
  }
  logout() {
    // Perform logout actions such as clearing authentication token, etc.
    // For example:
    // this.authService.logout(); // Assuming you have an authentication service
    this.router.navigate(['/login']); // Redirect to login page after logout
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
