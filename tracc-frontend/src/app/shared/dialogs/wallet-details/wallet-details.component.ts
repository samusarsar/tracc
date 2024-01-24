import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

import * as fromApp from '../../../store/app.reducer';
import * as WalletsActions from '../../../dashboard/wallets/store/wallets.actions';
import { Coin, Transaction, Wallet } from '../../types';
import { CreateTransactionComponent } from '../create-transaction/create-transaction.component';

@Component({
  selector: 'app-wallet-details',
  standalone: true,
  imports: [
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './wallet-details.component.html',
  styleUrl: './wallet-details.component.scss',
})
export class WalletDetailsComponent implements OnInit {
  wallet!: Wallet;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromApp.AppState>,
    private dialog: MatDialog,
    private injector: Injector,
    @Inject(MAT_DIALOG_DATA) public data: { walletId: string; coins: Coin[] }
  ) {}

  ngOnInit() {
    this.store.select('wallets').subscribe((state) => {
      this.wallet = state.wallets.find((w) => w.id === this.data.walletId)!;
    });
  }

  getFormattedDate(buyDate: string) {
    return new Date(buyDate).toLocaleDateString();
  }

  getTransactionCoinInfo(coinId: string) {
    return this.data.coins.find((c) => c.id === coinId);
  }

  getTransactionPNL(transaction: Transaction) {
    const pnl =
      this.data.coins.find((c) => c.id === transaction.coinId)!.current_price -
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
      const coin = this.data.coins.find((c) => c.id === transaction.coinId);

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

  addTransaction() {
    this.dialog.open(CreateTransactionComponent, {
      data: {
        wallet: this.wallet,
        coins: this.data.coins,
      },
      injector: this.injector,
    });
  }

  deleteTransaction(id: string) {
    this.store.dispatch(
      WalletsActions.deleteTransactionStart({
        walletId: this.data.walletId,
        transactionId: id,
      })
    );
  }
}
