import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { coinApiEndpoints } from '../environments/environment';
import { map, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { UserData } from '../shared/types';

export const dashboardUserResolver: ResolveFn<Object> = () => {
  return inject(Store<fromApp.AppState>)
    .select('auth')
    .pipe(map((state) => state.user));
};
