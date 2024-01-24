import { Routes } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { authGuard } from './auth/auth.guard';
import { dashboardCoinsResolver } from './dashboard/dashboard.coins.resolver';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardGuard } from './dashboard/dashboard.guard';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'auth',
    canActivateChild: [authGuard],
    loadChildren: () =>
      import('./auth/auth.routes').then((mod) => mod.AUTH_ROUTES),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard, dashboardGuard],
    component: DashboardComponent,
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then(
        (mod) => mod.DASHBOARD_ROUTES
      ),
    resolve: {
      coins: dashboardCoinsResolver,
    },
  },
];
