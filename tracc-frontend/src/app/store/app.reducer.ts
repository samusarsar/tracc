import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromWallets from '../dashboard/wallets/store/wallets.reducer';

export interface AppState {
  auth: fromAuth.State;
  wallets: fromWallets.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  wallets: fromWallets.walletsReducer,
};
