import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { UserData } from '../shared/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit {
  user!: UserData | null;

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit() {
    this.store.select('auth').subscribe((state) => {
      this.user = state.user;
    });
  }

  onNavigate(to: string) {
    this.router.navigate([to])
  }
}
