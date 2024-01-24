import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

import { Coin, Wallet } from '../../shared/types';
import { CarouselComponent } from '../../shared/carousel/carousel.component';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [MatButtonModule, CarouselComponent],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
})
export class DashboardHomeComponent implements OnInit {
  topCoins!: Coin[];
  trendingCoins!: Coin[];
  allCoins!: Coin[];
  wallets!: Wallet[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((res) => {
      this.topCoins = res['coins']['top'];
      this.trendingCoins = res['coins']['trending'];
      this.allCoins = res['coins']['all'];
    });

    this.store.select('wallets').subscribe((state) => {
      this.wallets = state.wallets;
    });
  }

  onNavigate(to: string) {
    this.router.navigate([`/dashboard/${to}`]);
  }
}
