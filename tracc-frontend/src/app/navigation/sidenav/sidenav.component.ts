import { AfterViewInit, Component, Input } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, MatButtonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements AfterViewInit {
  @Input() sidenavIsOpen!: boolean;

  ngAfterViewInit() {
    console.log(this.sidenavIsOpen);
  }
}
