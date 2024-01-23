import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ActivatedRoute, Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';

import * as AuthActions from '../auth/store/auth.actions';
import * as fromApp from '../store/app.reducer';
import { Coin, UserData } from '../shared/types';
import { CarouselComponent } from '../shared/carousel/carousel.component';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatDividerModule, MatButtonModule, CarouselComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  topCoins!: Coin[];
  trendingCoins!: Coin[];
  user!: UserData;

  constructor(
    private store: Store<fromApp.AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.select('auth').subscribe((state) => (this.user = state.user!));

    this.activatedRoute.data.subscribe((res) => {
      console.log(res['coins']);
      this.topCoins = res['coins']['top'];
      this.trendingCoins = res['coins']['trending'];
    });
  }

  onNavigate(to: string) {
    this.router.navigate([`/dashboard/${to}`]);
  }
}
