import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import Cookies from 'js-cookie';

import * as AuthActions from './auth.actions';
import { apiRoutes } from '../../environments/environment';
import { AuthResponse } from '../../shared/types';
import { isPlatformBrowser } from '@angular/common';

const handleAuthSuccess = (res: AuthResponse, platformId: any) => {
  const { access_token } = Cookies.get();

  console.log('Res:', res);
  console.log('Cookies:', Cookies.get());
  console.log('Access Token:', access_token);

  if (!access_token)
    return AuthActions.authFail({ error: 'Could not verify token.' });

  const user = {
    id: res._id,
    name: res.name,
    email: res.email,
    token: access_token,
  };

  if (isPlatformBrowser(platformId)) {
    localStorage.setItem('tracc-user', JSON.stringify(user));
  }

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
    private router: Router,
    @Inject(PLATFORM_ID) private readonly platformId: any
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
              return handleAuthSuccess(res, this.platformId);
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
              return handleAuthSuccess(res, this.platformId);
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
          if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('tracc-user');
          }
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
        const user = isPlatformBrowser(this.platformId)
          ? JSON.parse(localStorage.getItem('tracc-user') || 'null')
          : null;

        if (!user || !user?.token) {
          return AuthActions.clear();
        }

        return AuthActions.authSuccess({
          ...user,
        });
      })
    );
  });
}
