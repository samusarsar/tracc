import { Component, EventEmitter, Output } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavigationService } from './../navigation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private navigationService: NavigationService) {}

  onSidenavToggle() {
    this.navigationService.toggleSidenav();
  }
}
