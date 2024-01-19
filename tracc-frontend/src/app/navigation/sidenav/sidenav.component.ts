import { NavigationService } from './../navigation.service';
import { Component, Input, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserData } from '../../shared/types';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @Input() user!: UserData | null;

  constructor(private navigationService: NavigationService) {
    this.navigationService.toToggleSidenav.subscribe(() =>
      this.sidenav.toggle()
    );
  }
}
