import { createAction, props } from '@ngrx/store';
import { Wallet } from '../../../shared/types';

export const getWalletsStart = createAction(
  '[Wallets] Get Wallets Start',
  props<{
    owner: string;
  }>()
);

export const getWalletsSuccess = createAction(
  '[Wallets] Get Wallets Success',
  props<{ wallets: Wallet[] }>()
);

export const createWalletStart = createAction(
  '[Wallets] Create Wallet Start',
  props<{
    name: string;
    description: string;
    owner: string;
  }>()
);

export const createWalletSuccess = createAction(
  '[Wallets] Create Wallet Success',
  props<Wallet>()
);

export const walletsFail = createAction(
  '[Wallets] Wallets Action Fail',
  props<{
    error: string;
  }>()
);

export const deleteWalletStart = createAction(
  '[Wallets] Delete Wallet Start',
  props<{
    id: string;
  }>()
);

export const deleteWalletSuccess = createAction(
  '[Wallets] Delete Wallet Success',
  props<{
    id: string;
  }>()
);

export const editWalletStart = createAction(
  '[Wallets] Edit Wallet Start',
  props<{
    id: string;
    name: string;
    description: string;
  }>()
);

export const editWalletSuccess = createAction(
  '[Wallets] Edit Wallet Success',
  props<{
    id: string;
    name: string;
    description: string;
  }>()
);

export const createTransactionStart = createAction(
  '[Wallets] Create Transaction Start',
  props<{
    walletId: string;
    coinId: string;
    buyPrice: number;
    buyAmount: number;
    buyDate: Date;
  }>()
);

export const transactionActionSuccess = createAction(
  '[Wallets] Transaction Action Success',
  props<{
    walletId: string;
    updatedWallet: Wallet;
  }>()
);

export const deleteTransactionStart = createAction(
  '[Wallets] Delete Transaction Start',
  props<{
    walletId: string;
    transactionId: string;
  }>()
);
