import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { dashboardResolver } from './dashboard.resolver';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: { coins: dashboardResolver },
  },
];
