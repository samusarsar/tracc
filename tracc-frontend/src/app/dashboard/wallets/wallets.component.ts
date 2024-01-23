import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Coin } from '../../shared/types';
import { WalletCardComponent } from '../../shared/wallet-card/wallet-card.component';

@Component({
  selector: 'app-wallets',
  standalone: true,
  imports: [WalletCardComponent],
  templateUrl: './wallets.component.html',
  styleUrl: './wallets.component.scss',
})
export class WalletsComponent implements OnInit {
  coins!: Coin[];
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

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.parent?.data.subscribe((res) => {
      this.coins = res['coins']['all'];
    });
  }
}
