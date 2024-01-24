import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'tracc';

  user!: UserData | null;
  isLoading = true;

  constructor(
    private store: Store<fromApp.AppState>,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.store.dispatch(AuthActions.autoLogin());
    this.store.select('auth').subscribe((state) => {
      this.user = state.user;
      this.isLoading = state.loading;
    });
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  getRandomProgress() {
    return Math.random() * 100;
  }
}
