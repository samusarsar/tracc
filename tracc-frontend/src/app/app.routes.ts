import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { authGuard } from './auth/auth.guard';
import { dashboardResolver } from './dashboard/dashboard.resolver';

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
    canActivateChild: [authGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then(
        (mod) => mod.DASHBOARD_ROUTES
      ),
    resolve: { coins: dashboardResolver },
  },
];
