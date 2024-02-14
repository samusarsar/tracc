import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';

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
export class DashboardHomeComponent implements OnInit, OnDestroy {
  topCoins!: Coin[];
  trendingCoins!: Coin[];
  allCoins!: Coin[];
  wallets!: Wallet[];
  walletStoreSub!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.activatedRoute.data.pipe(take(1)).subscribe((res) => {
      this.topCoins = res['coins']['top'];
      this.trendingCoins = res['coins']['trending'];
      this.allCoins = res['coins']['all'];
    });

    this.walletStoreSub = this.store.select('wallets').subscribe((state) => {
      this.wallets = state.wallets;
    });
  }

  ngOnDestroy() {
    this.walletStoreSub.unsubscribe();
  }

  onNavigate(to: string) {
    this.router.navigate([`/dashboard/${to}`]);
  }
}
