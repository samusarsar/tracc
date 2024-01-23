import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Coin } from '../../shared/types';
import { CoinCardComponent } from '../../shared/coin-card/coin-card.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CoinCardComponent,
    FormsModule,
  ],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss',
})
export class ExploreComponent {
  coins!: Coin[];
  filteredCoins!: Coin[];

  searchTerm = '';

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.parent?.data.subscribe((res) => {
      console.log(res);
      this.coins = res['coins']['all'];
      this.filteredCoins = this.coins;
    });
  }

  handleSearch(value: string) {
    this.searchTerm = value;

    if (this.searchTerm) {
      this.filteredCoins = this.coins.filter(
        (coin) =>
          coin.name
            .toLowerCase()
            .includes(this.searchTerm.trim().toLowerCase()) ||
          coin.symbol
            .toLowerCase()
            .includes(this.searchTerm.trim().toLowerCase())
      );
      return;
    }

    this.filteredCoins = this.coins;
  }
}
