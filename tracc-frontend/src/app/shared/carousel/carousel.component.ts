import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Coin } from '../types';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CoinCardComponent } from '../coin-card/coin-card.component';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CoinCardComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements AfterViewInit {
  @Input() coins!: Coin[];
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
