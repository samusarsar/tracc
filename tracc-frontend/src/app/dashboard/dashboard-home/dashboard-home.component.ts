import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';

import { Coin } from '../../shared/types';
import { CarouselComponent } from '../../shared/carousel/carousel.component';
import * as fromApp from '../../store/app.reducer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [MatButtonModule, CarouselComponent],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
})
export class DashboardHomeComponent implements OnInit {
  topCoins!: Coin[];
  trendingCoins!: Coin[];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((res) => {
      this.topCoins = res['coins']['top'];
      this.trendingCoins = res['coins']['trending'];
    });
  }

  onNavigate(to: string) {
    this.router.navigate([`/dashboard/${to}`]);
  }
}
