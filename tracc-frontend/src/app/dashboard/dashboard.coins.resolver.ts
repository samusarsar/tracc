import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { coinApiEndpoints } from '../environments/environment';
import { map, of } from 'rxjs';
import { Coin } from '../shared/types';

export const dashboardCoinsResolver: ResolveFn<Object> = () => {
  return inject(HttpClient)
    .get<Coin[]>(coinApiEndpoints.MARKET_TOP_100)
    .pipe(
      map((coins) => {
        return {
          all: coins,
          top: coins.slice(0, 6),
          trending: coins
            .sort(
              (a, b) =>
                b.price_change_percentage_24h - a.price_change_percentage_24h
            )
            .slice(0, 6),
        };
      })
    );
};
