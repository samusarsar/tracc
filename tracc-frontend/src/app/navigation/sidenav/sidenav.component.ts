import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

import { NavigationService } from './../navigation.service';
import { UserData } from '../../shared/types';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @Input() user!: UserData | null;

  navigationServiceSub!: Subscription;

  constructor(private navigationService: NavigationService) {}

  ngOnInit() {
    this.navigationServiceSub =
      this.navigationService.toToggleSidenav.subscribe(() =>
        this.sidenav.toggle()
      );
  }

  ngOnDestroy() {
    this.navigationServiceSub.unsubscribe();
  }
}
