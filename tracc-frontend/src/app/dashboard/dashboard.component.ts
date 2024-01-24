import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { take } from 'rxjs';

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
export class DashboardComponent {
  user!: UserData;
  heading!: string;

  constructor(private store: Store<fromApp.AppState>, private router: Router) {
    this.store
      .select('auth')
      .pipe(take(1))
      .subscribe((state) => (this.user = state.user!));

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlArr = event.url.split('/');
        this.heading = this.getHeading(urlArr);
      }
    });
  }

  getHeading(urlArr: string[]) {
    if (urlArr.length === 2) {
      return `Welcome back, ${this.user.name}!`;
    } else {
      return urlArr[2].slice(0, 1).toUpperCase() + urlArr[2].slice(1);
    }
  }
}
