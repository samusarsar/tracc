import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  toToggleSidenav = new Subject();

  toggleSidenav() {
    this.toToggleSidenav.next(true);
  }
}
