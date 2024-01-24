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
      walletError: '',
      loading: false,
    };
  }),
  on(WalletsActions.getWalletsStart, (state) => {
    return {
      ...state,
      walletError: '',
      loading: true,
    };
  }),
  on(WalletsActions.getWalletsSuccess, (state, action) => {
    return {
      ...state,
      wallets: action.wallets,
      walletError: '',
      loading: false,
    };
  }),
  on(WalletsActions.walletsFail, (state, action) => {
    return {
      ...state,
      walletError: action.error,
      loading: false,
    };
  }),
  on(WalletsActions.deleteWalletStart, (state) => {
    return {
      ...state,
      walletError: '',
      loading: true,
    };
  }),
  on(WalletsActions.deleteWalletSuccess, (state, action) => {
    return {
      ...state,
      wallets: state.wallets.filter((w) => w.id !== action.id),
      walletError: '',
      loading: false,
    };
  }),
  on(WalletsActions.editWalletStart, (state) => {
    return {
      ...state,
      walletError: '',
      loading: true,
    };
  }),
  on(WalletsActions.editWalletSuccess, (state, action) => {
    return {
      ...state,
      wallets: state.wallets.map((w) => {
        if (w.id === action.id) {
          return { ...w, name: action.name, description: action.description };
        }
        return w;
      }),
      walletError: '',
      loading: false,
    };
  }),
  on(WalletsActions.createTransactionStart, (state) => {
    return {
      ...state,
      walletError: '',
      loading: true,
    };
  }),
  on(WalletsActions.transactionActionSuccess, (state, action) => {
    return {
      ...state,
      wallets: state.wallets.map((w) => {
        if (w.id === action.walletId) {
          return action.updatedWallet;
        }
        return w;
      }),
      walletError: '',
      loading: false,
    };
  })
);
