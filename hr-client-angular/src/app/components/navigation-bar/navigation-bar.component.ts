import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { filter } from 'rxjs';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: any;
  activeRoute: string = '';
  opened: boolean = false;
  isLoginPage: boolean = false;
  isDetailPage: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private _eref: ElementRef,
    private router: Router,
    private authService: AuthService,
    private location: Location
  ) {
    const sub = this.router.events
      .pipe(filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
        this.isLoginPage = url.startsWith('/login');
        this.isDetailPage =
          url.match(/\/housing-details\/\w+$/) ||
          url.match(/\/full-profile\/\w+$/) ||
          url.match(/\/onboarding\/\w+$/)
            ? true
            : false; // Removed the duplicate regex

        this.setActiveRoute(url); // Update active route when navigation ends
      });
    this.subscription.add(sub);
  }

  ngOnInit(): void {}

  toggleSidebar() {
    this.opened = !this.opened;
  }

  goBack(): void {
    this.location.back();
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
    this.authService.logout(); // Assuming you have an authentication service
    this.router.navigate(['/login']); // Redirect to login page after logout
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
