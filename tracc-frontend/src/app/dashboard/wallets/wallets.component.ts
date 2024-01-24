import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

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
export class WalletsComponent implements OnInit {
  coins!: Coin[];
  wallets!: Wallet[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.activatedRoute.parent?.data.subscribe((res) => {
      this.coins = res['coins']['all'];
    });

    this.store.select('wallets').subscribe((state) => {
      this.wallets = state.wallets;
    });
  }

  onOpenDialog() {
    this.dialog.open(CreateWalletComponent);
  }
}
