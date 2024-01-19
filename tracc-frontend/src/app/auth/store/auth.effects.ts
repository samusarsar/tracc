import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import Cookies from 'js-cookie';

import * as AuthActions from './auth.actions';
import { apiRoutes } from '../../environments/environment';
import { AuthResponse } from '../../shared/types';

const handleAuthSuccess = (res: AuthResponse) => {
  const { access_token } = Cookies.get();

  if (!access_token)
    return AuthActions.authFail({ error: 'Could not verify token.' });

  const user = {
    id: res._id,
    name: res.name,
    email: res.email,
    token: access_token,
  };

  localStorage.setItem('tracc-user', JSON.stringify(user));

  return AuthActions.authSuccess({
    ...user,
    redirect: true,
  });
};

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
        return this.http
          .post<AuthResponse>(
            apiRoutes.BASE + apiRoutes.SIGNUP,
            {
              name: signupAction.name,
              email: signupAction.email,
              password: signupAction.password,
            },
            {
              withCredentials: true,
            }
          )
          .pipe(
            map((res) => {
              return handleAuthSuccess(res);
            }),
            catchError((error) => {
              return of(AuthActions.authFail({ error: error.error.message }));
            })
          );
      })
    );
  });

  authLogin = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginStart),
      switchMap((loginAction) => {
        return this.http
          .post<AuthResponse>(
            apiRoutes.BASE + apiRoutes.LOGIN,
            {
              email: loginAction.email,
              password: loginAction.password,
            },
            {
              withCredentials: true,
            }
          )
          .pipe(
            map((res) => {
              return handleAuthSuccess(res);
            }),
            catchError((error) => {
              return of(AuthActions.authFail({ error: error.error.message }));
            })
          );
      })
    );
  });

  authLogout = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        map(() => {
          Cookies.remove('access_token');
          localStorage.removeItem('tracc-user');
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  authRedirect = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.authSuccess),
        tap((authSuccessActon) => {
          if (authSuccessActon.redirect) {
            this.router.navigate(['/dashboard']);
          }
        })
      );
    },
    { dispatch: false }
  );

  authAutoLogin = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      map(() => {
        const user = JSON.parse(localStorage.getItem('tracc-user') || 'null');

        if (!user || !user?.token) {
          return {
            type: 'NO AUTO-LOGIN',
          };
        }

        return AuthActions.authSuccess({
          ...user,
        });
      })
    );
  });
}
