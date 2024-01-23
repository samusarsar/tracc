import { Routes } from '@angular/router';

import { ExploreComponent } from './explore/explore.component';
import { WalletsComponent } from './wallets/wallets.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardHomeComponent,
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
