import { CanActivateChildFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

import * as fromApp from '../store/app.reducer';

export const authGuard: CanActivateChildFn = (route, state) => {
  const store = inject(Store<fromApp.AppState>);
  const router = inject(Router);

  return store.select('auth').pipe(
    take(1),
    map((state) => {
      return state.user;
    }),
    map((user) => {
      const isAuth = !!user;
      const isAuthRoute = state.url.includes('/auth');

      if (isAuth && isAuthRoute) {
        return router.createUrlTree(['/dashboard']);
      }

      if (!isAuth && !isAuthRoute) {
        return router.createUrlTree(['/auth/login']);
      }

      return true;
    })
  );
};
