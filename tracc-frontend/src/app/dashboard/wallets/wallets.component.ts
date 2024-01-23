import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { Coin } from '../../shared/types';
import { WalletCardComponent } from '../../shared/wallet-card/wallet-card.component';
import { CreateWalletComponent } from '../../shared/dialogs/create-wallet/create-wallet.component';

@Component({
  selector: 'app-wallets',
  standalone: true,
  imports: [MatButtonModule, WalletCardComponent],
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

  constructor(
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.activatedRoute.parent?.data.subscribe((res) => {
      this.coins = res['coins']['all'];
    });
  }

  onOpenDialog() {
    this.dialog.open(CreateWalletComponent);
  }
}
