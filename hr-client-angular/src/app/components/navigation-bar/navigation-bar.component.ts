import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent implements OnInit {
  isOpen = false;
  constructor() {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
