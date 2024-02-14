import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { UpperCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { Coin } from '../../shared/types';

@Component({
  selector: 'app-coin-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    UpperCasePipe,
    MatDividerModule,
    MatRippleModule,
  ],
  templateUrl: './coin-card.component.html',
  styleUrl: './coin-card.component.scss',
})
export class CoinCardComponent {
  @Input() coin!: Coin;

  constructor(private router: Router) {}

  onNavigate() {
    window.open(
      `https://www.coingecko.com/en/coins/${this.coin.name.toLowerCase()}`
    );
  }
}
