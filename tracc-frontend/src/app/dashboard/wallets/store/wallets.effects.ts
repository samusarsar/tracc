import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, switchMap } from 'rxjs';

import * as WalletsActions from './wallets.actions';
import { apiRoutes } from '../../../environments/environment';
import { Wallet } from '../../../shared/types';

@Injectable({ providedIn: 'root' })
export class WalletsEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  createWallet = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.createWalletStart),
      switchMap((createAction) => {
        return this.http
          .post<Wallet>(apiRoutes.BASE + apiRoutes.CREATE_WALLET, {
            name: createAction.name,
            description: createAction.description,
            owner: createAction.owner,
          })
          .pipe(
            map((res) => {
              return WalletsActions.createWalletSuccess(res);
            }),
            catchError((error) => {
              return of(
                WalletsActions.walletsFail({ error: error.error.message })
              );
            })
          );
      })
    );
  });

  getWallets = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.getWalletsStart),
      switchMap((getAction) => {
        return this.http
          .get<Wallet[]>(
            apiRoutes.BASE + apiRoutes.GET_WALLETS + `/${getAction.owner}`
          )
          .pipe(
            map((res) => {
              return WalletsActions.getWalletsSuccess({ wallets: res });
            }),
            catchError((error) => {
              return of(
                WalletsActions.walletsFail({ error: error.error.message })
              );
            })
          );
      })
    );
  });
}
