import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { UpperCasePipe } from '@angular/common';
import { Coin } from '../../shared/types';

@Component({
  selector: 'app-coin-card',
  standalone: true,
  imports: [MatCardModule, UpperCasePipe, MatDividerModule, MatRippleModule],
  templateUrl: './coin-card.component.html',
  styleUrl: './coin-card.component.scss',
})
export class CoinCardComponent {
  @Input() coin!: Coin;
}
