import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';

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
export class AppComponent implements OnInit, AfterViewChecked, OnDestroy {
  title = 'tracc';

  user!: UserData | null;
  isLoading = true;
  authStoreSub!: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.store.dispatch(AuthActions.autoLogin());
    this.authStoreSub = this.store.select('auth').subscribe((state) => {
      this.user = state.user;
      this.isLoading = state.loading;
    });
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.authStoreSub.unsubscribe();
  }

  getRandomProgress() {
    return Math.random() * 100;
  }
}
