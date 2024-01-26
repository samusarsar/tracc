import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import Cookies from 'js-cookie';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

import * as AuthActions from './auth.actions';
import { apiRoutes } from '../../environments/environment';
import { AuthResponse, UserData } from '../../shared/types';

const handleAuthSuccess = (res: AuthResponse, platformId: any) => {
  const { access_token } = Cookies.get();

  const user = {
    id: res._id,
    name: res.name,
    email: res.email,
    token: access_token,
  };

  if (isPlatformBrowser(platformId)) {
    localStorage.setItem('tracc-user', JSON.stringify(user));
  } else if (isPlatformServer(platformId)) {
    (global as any)['tracc-user'] = user;
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
          } else if (isPlatformServer(this.platformId)) {
            (global as any)['tracc-user'] = null;
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
        let user: UserData | null = null;

        if (isPlatformBrowser(this.platformId)) {
          user = JSON.parse(localStorage.getItem('tracc-user') || 'null');
        } else if (isPlatformServer(this.platformId)) {
          user = (global as any)['tracc-user'] || null;
        }

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
