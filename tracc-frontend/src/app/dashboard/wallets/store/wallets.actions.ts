import { createAction, props } from '@ngrx/store';
import { Wallet } from '../../../shared/types';

export const getWalletsStart = createAction('[Wallets] Get Wallets Start');

export const getWalletsSuccess = createAction('[Wallets] Get Wallets Success');

export const getWalletsFail = createAction('[Wallets] Get Wallets Fail');

export const createWalletStart = createAction(
  '[Wallets] Create Wallet Start',
  props<{
    name: string;
    description: string;
  }>()
);

export const createWalletSuccess = createAction(
  '[Wallets] Create Wallet Success',
  props<Wallet>()
);

export const createWalletFail = createAction(
  '[Wallets] Create Wallet Fail',
  props<{
    error: string;
  }>()
);
