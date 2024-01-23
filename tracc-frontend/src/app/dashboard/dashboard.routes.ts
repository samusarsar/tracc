import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ExploreComponent } from './explore/explore.component';
import { WalletsComponent } from './wallets/wallets.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'explore',
    component: ExploreComponent,
  },
  {
    path: 'wallets',
    component: WalletsComponent,
  },
];
