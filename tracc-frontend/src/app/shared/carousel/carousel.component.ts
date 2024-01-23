import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Coin, Wallet } from '../types';
import { CoinCardComponent } from '../coin-card/coin-card.component';
import { WalletCardComponent } from '../wallet-card/wallet-card.component';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    CoinCardComponent,
    WalletCardComponent,
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements AfterViewInit {
  @Input() coins!: Coin[];
  @Input() wallets!: Wallet[];
  @ViewChild('carousel', { static: false }) carousel!: ElementRef;

  scrollLeft = 0;

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  get leftScrollDisabled(): boolean {
    return this.scrollLeft === 0;
  }

  get rightScrollDisabled(): boolean {
    const element = this.carousel?.nativeElement;
    return this.scrollLeft + element?.clientWidth >= element?.scrollWidth;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  scrollCarousel(distance: number): void {
    this.scrollLeft += distance;

    this.carousel.nativeElement.scrollBy({
      left: distance,
      behavior: 'smooth',
    });
  }
}
