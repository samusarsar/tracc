import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';

import * as fromApp from '../store/app.reducer';
import * as WalletsActions from './wallets/store/wallets.actions';
import { map, of, take } from 'rxjs';

export const dashboardGuard: CanActivateFn = () => {
  const store = inject(Store<fromApp.AppState>);

  return of(
    store
      .select('auth')
      .pipe(take(1))
      .subscribe((state) => {
        if (state.user) {
          store.dispatch(
            WalletsActions.getWalletsStart({ owner: state.user.email })
          );
        }
      })
  ).pipe(map(() => true));
};
