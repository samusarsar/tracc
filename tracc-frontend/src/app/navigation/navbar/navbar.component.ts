import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { NavigationService } from './../navigation.service';
import { UserData } from '../../shared/types';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Input() user!: UserData | null;

  constructor(
    private navigationService: NavigationService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  onSidenavToggle() {
    this.navigationService.toggleSidenav();
  }

  onNavigate(to: string) {
    this.router.navigate([to]);
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }
}
