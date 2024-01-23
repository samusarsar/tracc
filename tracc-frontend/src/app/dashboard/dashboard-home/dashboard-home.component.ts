import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';

import { Coin } from '../../shared/types';
import { CarouselComponent } from '../../shared/carousel/carousel.component';
import * as fromApp from '../../store/app.reducer';
import { ActivatedRoute, Router } from '@angular/router';

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
  wallets = [
    {
      id: 'sdad1',
      name: 'My Wallet',
      description: 'This is my wallet',
      transactions: [
        {
          id: '1',
          coinId: 'bitcoin',
          buyPrice: 80000,
          buyAmount: 1,
          createdAt: new Date(),
        },
        {
          id: '2',
          coinId: 'bitcoin',
          buyPrice: 40000,
          buyAmount: 1,
          createdAt: new Date(),
        },
      ],
      createdAt: new Date(),
    },
    {
      id: 'sdad1',
      name: 'My Wallet',
      description: 'This is my wallet',
      transactions: [
        {
          id: '1',
          coinId: 'bitcoin',
          buyPrice: 80000,
          buyAmount: 1,
          createdAt: new Date(),
        },
        {
          id: '2',
          coinId: 'bitcoin',
          buyPrice: 40000,
          buyAmount: 1,
          createdAt: new Date(),
        },
      ],
      createdAt: new Date(),
    },
    {
      id: 'sdad1',
      name: 'My Wallet',
      description: 'This is my wallet',
      transactions: [
        {
          id: '1',
          coinId: 'bitcoin',
          buyPrice: 80000,
          buyAmount: 1,
          createdAt: new Date(),
        },
        {
          id: '2',
          coinId: 'bitcoin',
          buyPrice: 40000,
          buyAmount: 1,
          createdAt: new Date(),
        },
      ],
      createdAt: new Date(),
    },
  ];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((res) => {
      this.topCoins = res['coins']['top'];
      this.trendingCoins = res['coins']['trending'];
      this.allCoins = res['coins']['all'];
    });
  }

  onNavigate(to: string) {
    this.router.navigate([`/dashboard/${to}`]);
  }
}
