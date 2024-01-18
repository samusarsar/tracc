import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import * as AuthActions from './auth.actions';
import { apiRoutes } from '../../shared/api.constants';
import { AuthResponse, UserData } from '../../shared/types';

@Injectable({ providedIn: 'root' })
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}

  authSignup = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signupStart),
      switchMap((signupAction) => {
        console.log(apiRoutes.BASE + apiRoutes.SIGNUP);
        return this.http
          .post<AuthResponse>(apiRoutes.BASE + apiRoutes.SIGNUP, {
            name: signupAction.name,
            email: signupAction.email,
            password: signupAction.password,
          })
          .pipe(
            map((res) => {
              const user = {
                id: res._id,
                name: res.name,
                email: res.email,
              };
              localStorage.setItem('tracc-user', JSON.stringify(user));
              return AuthActions.authSuccess(user);
            }),
            catchError((error) => {
              return of(AuthActions.authFail({ error: error.error.message }));
            })
          );
      })
    );
  });
}
