import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngrx/store';

import { Coin, Transaction, Wallet } from '../types';
import * as fromApp from '../../store/app.reducer';
import * as WalletsActions from './../../dashboard/wallets/store/wallets.actions';
import { MatDialog } from '@angular/material/dialog';
import { CreateWalletComponent } from '../dialogs/create-wallet/create-wallet.component';
import { WalletDetailsComponent } from '../dialogs/wallet-details/wallet-details.component';

@Component({
  selector: 'app-wallet-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatRippleModule,
    MatDividerModule,
  ],
  templateUrl: './wallet-card.component.html',
  styleUrl: './wallet-card.component.scss',
})
export class WalletCardComponent {
  @Input() wallet!: Wallet;
  @Input() coins!: Coin[];

  constructor(
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog
  ) {}

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

  onViewDetails() {
    this.dialog.open(WalletDetailsComponent, { data: this.wallet });
  }

  onEdit() {
    this.dialog.open(CreateWalletComponent, { data: this.wallet });
  }

  onDelete() {
    this.store.dispatch(
      WalletsActions.deleteWalletStart({ id: this.wallet.id })
    );
  }
}
