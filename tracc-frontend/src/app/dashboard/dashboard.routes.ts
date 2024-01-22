import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { dashboardResolver } from './dashboard.resolver';
import { ExploreComponent } from './explore/explore.component';
import { WalletsComponent } from './wallets/wallets.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: { coins: dashboardResolver },
  },
  {
    path: 'explore',
    component: ExploreComponent,
    resolve: { coins: dashboardResolver },
  },
  {
    path: 'wallets',
    component: WalletsComponent,
    resolve: { coins: dashboardResolver },
  },
];
