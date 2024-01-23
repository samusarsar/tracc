import { createReducer, on } from '@ngrx/store';

import * as WalletsActions from './wallets.actions';
import { Wallet } from '../../../shared/types';

export interface State {
  wallets: Wallet[] | [];
  walletError: string;
  loading: boolean;
}

const initialState: State = {
  wallets: [],
  walletError: '',
  loading: false,
};

export const walletsReducer = createReducer(
  initialState,
  on(WalletsActions.createWalletStart, (state) => {
    return {
      ...state,
      walletError: '',
      loading: true,
    };
  }),
  on(WalletsActions.createWalletSuccess, (state, action) => {
    return {
      ...state,
      wallets: [...state.wallets, action],
      loading: false,
    };
  }),
  on(WalletsActions.createWalletFail, (state, action) => {
    return {
      ...state,
      walletError: action.error,
      loading: false,
    };
  })
);
