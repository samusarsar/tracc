import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Subscription, take } from 'rxjs';

import * as fromApp from '../store/app.reducer';
import { UserData } from '../shared/types';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatDividerModule,
    MatButtonModule,
    DashboardHomeComponent,
    RouterModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  user!: UserData | null;
  heading!: string;

  authStoreSub!: Subscription;
  routerEventsSub!: Subscription;

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit(): void {
    this.authStoreSub = this.store
      .select('auth')
      .pipe(take(1))
      .subscribe((state) => {
        this.user = state.user;
        this.updateHeading();
      });

    this.routerEventsSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateHeading();
      }
    });
  }
  ngOnDestroy(): void {
    this.authStoreSub.unsubscribe();
    this.routerEventsSub.unsubscribe();
  }

  updateHeading() {
    const urlArr = this.router.url.split('/');
    this.heading = this.getHeading(urlArr);
  }

  getHeading(urlArr: string[]) {
    if (urlArr.length === 2) {
      return `Welcome back, ${this.user?.name}!`;
    } else {
      return urlArr[2].slice(0, 1).toUpperCase() + urlArr[2].slice(1);
    }
  }
}
