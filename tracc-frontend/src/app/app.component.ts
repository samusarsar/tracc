import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NavbarComponent } from './navigation/navbar/navbar.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
import { UserData } from './shared/types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    SidenavComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'tracc';

  user!: UserData | null;
  isLoading = true;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store.dispatch(AuthActions.autoLogin());
    this.store.select('auth').subscribe((state) => {
      this.user = state.user;
      this.isLoading = state.loading;
    });
  }

  getRandomProgress() {
    return Math.random() * 100;
  }
}
