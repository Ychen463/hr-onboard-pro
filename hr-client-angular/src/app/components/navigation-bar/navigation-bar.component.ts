import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

/** @title Basic sidenav */
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent {
  @ViewChild('sidenav') sidenav: any;
  opened = false;

  constructor(private _eref: ElementRef) {}

  toggleSidebar() {
    this.opened = !this.opened;
  }

  onContainerClicked(event: MouseEvent) {
    if (this.opened && !this._eref.nativeElement.contains(event.target)) {
      this.sidenav.close();
    }
  }
}

