import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Coin, Wallet } from '../../shared/types';
import { WalletCardComponent } from '../../shared/wallet-card/wallet-card.component';
import { CreateWalletComponent } from '../../shared/dialogs/create-wallet/create-wallet.component';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-wallets',
  standalone: true,
  imports: [MatButtonModule, WalletCardComponent],
  templateUrl: './wallets.component.html',
  styleUrl: './wallets.component.scss',
})
export class WalletsComponent implements OnInit, OnDestroy {
  coins!: Coin[];
  wallets!: Wallet[];
  walletStoreSub!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.activatedRoute.parent?.data.subscribe((res) => {
      this.coins = res['coins']['all'];
    });

    this.walletStoreSub = this.store.select('wallets').subscribe((state) => {
      this.wallets = state.wallets;
    });
  }

  ngOnDestroy() {
    this.walletStoreSub.unsubscribe();
  }

  onOpenDialog() {
    this.dialog.open(CreateWalletComponent, {
      autoFocus: false,
    });
  }
}
