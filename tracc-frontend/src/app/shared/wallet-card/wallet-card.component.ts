import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';

import { Coin, Transaction, Wallet } from '../types';

@Component({
  selector: 'app-wallet-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatTableModule, MatRippleModule, MatDividerModule],
  templateUrl: './wallet-card.component.html',
  styleUrl: './wallet-card.component.scss',
})
export class WalletCardComponent {
  @Input() wallet!: Wallet;
  @Input() coins!: Coin[];

  constructor() {}

  getTransactionPNL(transaction: Transaction) {
    const pnl =
      this.coins.find((c) => c.id === transaction.coinId)!.current_price -
      transaction.buyPrice;

    return {
      nominal: pnl,
      percentage: (pnl / transaction.buyPrice) * 100,
    };
  }

  getWalletPNL() {
    let totalInvested = 0;
    let totalPNL = 0;
    let totalWeight = 0;

    this.wallet.transactions.forEach((transaction) => {
      const coin = this.coins.find((c) => c.id === transaction.coinId);

      if (coin) {
        const pnl = coin.current_price - transaction.buyPrice;

        totalInvested += transaction.buyPrice * transaction.buyAmount;
        totalPNL += pnl * transaction.buyAmount;
        totalWeight += transaction.buyAmount;
      }
    });

    if (totalWeight > 0) {
      const weightedPNL = (totalPNL / totalInvested) * 100;
      return {
        percentage: weightedPNL,
        nominal: totalPNL,
      };
    } else {
      return {
        percentage: 0,
        nominal: 0,
      };
    }
  }
}
