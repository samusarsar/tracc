import { createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { UserData } from '../../shared/types';

export interface State {
  user: UserData | null;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: '',
  loading: true,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.authSuccess, (state, action) => {
    return {
      ...state,
      authError: '',
      user: {
        id: action.id,
        email: action.email,
        name: action.name,
        token: action.token,
      },
      loading: false,
    };
  }),
  on(AuthActions.authFail, (state, action) => {
    return {
      ...state,
      authError: action.error,
      user: null,
      loading: false,
    };
  }),
  on(AuthActions.logout, (state) => {
    return {
      ...state,
      user: null,
    };
  }),
  on(AuthActions.loginStart, (state) => {
    return {
      ...state,
      authError: '',
      loading: true,
    };
  }),
  on(AuthActions.signupStart, (state) => {
    return {
      ...state,
      authError: '',
      loading: true,
    };
  }),
  on(AuthActions.autoLogin, (state) => {
    return {
      ...state,
      authError: '',
      loading: true,
    };
  }),
  on(AuthActions.clear, (state) => {
    return {
      ...state,
      user: null,
      authError: '',
      loading: false,
    };
  })
);
