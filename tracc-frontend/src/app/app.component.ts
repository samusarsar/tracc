import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, SidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  sidenavIsOpen = false;

  title = 'tracc';

  toggleSidenav() {
    console.log('hit');
    this.sidenavIsOpen = !this.sidenavIsOpen;
  }
}
