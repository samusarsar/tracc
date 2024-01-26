import { createAction, props } from '@ngrx/store';

export const authSuccess = createAction(
  '[Auth] Auth Success',
  props<{
    id: string;
    email: string;
    name: string;
    redirect?: boolean;
    token: string | undefined;
  }>()
);

export const authFail = createAction(
  '[Auth] Auth Fail',
  props<{
    error: string;
  }>()
);

export const loginStart = createAction(
  '[Auth] Login Start',
  props<{
    email: string;
    password: string;
  }>()
);

export const logout = createAction('[Auth] Logout');

export const signupStart = createAction(
  '[Auth] Signup Start',
  props<{ email: string; name: string; password: string }>()
);

export const autoLogin = createAction('[Auth] Auto Login');

export const clear = createAction('[Auth] Clear');
