import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import * as fromApp from '../store/app.reducer';
import { UserData } from '../shared/types';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit, OnDestroy {
  user!: UserData | null;
  authStoreSub!: Subscription;

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit() {
    this.authStoreSub = this.store.select('auth').subscribe((state) => {
      this.user = state.user;
    });
  }

  ngOnDestroy() {
    this.authStoreSub.unsubscribe();
  }

  onNavigate(to: string) {
    this.router.navigate([to]);
  }
}
