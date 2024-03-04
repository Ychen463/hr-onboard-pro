import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  title = 'hr-client-angular';
  activeRoute: string = '';
  opened = false;

  constructor(
    private _eref: ElementRef,
    private router: Router,
    private authService: AuthService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setActiveRoute(event.url); // Update active route when navigation ends
      }
    });
  }

  ngOnInit(): void {}

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
    this.authService.logout(); // Assuming you have an authentication service
    this.router.navigate(['/login']); // Redirect to login page after logout
  }
}
