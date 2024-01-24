import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { coinApiEndpoints } from '../environments/environment';
import { map, of } from 'rxjs';
import { Coin } from '../shared/types';

export const dashboardCoinsResolver: ResolveFn<Object> = () => {
  // return inject(HttpClient).get<Coin[]>(coinApiEndpoints.MARKET_TOP_100).pipe(
  //   map(coins => {
  //     return {
  //       all: coins,
  //       top: coins.slice(0, 6),
  //       trending: coins
  //         .sort(
  //           (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
  //         )
  //         .slice(0, 6),
  //     };
  //   })
  // );

  // mock allCoins
  const allCoins = [
    {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      current_price: 41327,
      market_cap: 809527890536,
      market_cap_rank: 1,
      fully_diluted_valuation: 867236579428,
      total_volume: 27797709062,
      high_24h: 42760,
      low_24h: 40655,
      price_change_24h: -1146.0864983398205,
      price_change_percentage_24h: -2.69837,
      market_cap_change_24h: -23862052683.857178,
      market_cap_change_percentage_24h: -2.86325,
      circulating_supply: 19602593,
      total_supply: 21000000,
      max_supply: 21000000,
      ath: 69045,
      ath_change_percentage: -40.18811,
      ath_date: '2021-11-10T14:24:11.849Z',
      atl: 67.81,
      atl_change_percentage: 60801.91563,
      atl_date: '2013-07-06T00:00:00.000Z',
      roi: null,
      last_updated: '2024-01-19T14:05:06.824Z',
    },
    {
      id: 'ethereum',
      symbol: 'eth',
      name: 'Ethereum',
      image:
        'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
      current_price: 2495.9,
      market_cap: 299307612019,
      market_cap_rank: 2,
      fully_diluted_valuation: 299307612019,
      total_volume: 19023750114,
      high_24h: 2534,
      low_24h: 2427.71,
      price_change_24h: -17.610640291867185,
      price_change_percentage_24h: -0.70064,
      market_cap_change_24h: -3558038771.0308228,
      market_cap_change_percentage_24h: -1.17479,
      circulating_supply: 120177064.748691,
      total_supply: 120177064.748691,
      max_supply: null,
      ath: 4878.26,
      ath_change_percentage: -48.9458,
      ath_date: '2021-11-10T14:24:19.604Z',
      atl: 0.432979,
      atl_change_percentage: 575114.38542,
      atl_date: '2015-10-20T00:00:00.000Z',
      roi: {
        times: 79.66322649679351,
        currency: 'btc',
        percentage: 7966.322649679351,
      },
      last_updated: '2024-01-19T14:05:00.107Z',
    },
    {
      id: 'tether',
      symbol: 'usdt',
      name: 'Tether',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661',
      current_price: 0.998711,
      market_cap: 94959004683,
      market_cap_rank: 3,
      fully_diluted_valuation: 94959004683,
      total_volume: 42836560232,
      high_24h: 1.002,
      low_24h: 0.994895,
      price_change_24h: 0.00062193,
      price_change_percentage_24h: 0.06231,
      market_cap_change_24h: -60367764.07777405,
      market_cap_change_percentage_24h: -0.06353,
      circulating_supply: 95060023617.7112,
      total_supply: 95060023617.7112,
      max_supply: null,
      ath: 1.32,
      ath_change_percentage: -24.49997,
      ath_date: '2018-07-24T00:00:00.000Z',
      atl: 0.572521,
      atl_change_percentage: 74.48047,
      atl_date: '2015-03-02T00:00:00.000Z',
      roi: null,
      last_updated: '2024-01-19T14:05:14.171Z',
    },
    {
      id: 'binancecoin',
      symbol: 'bnb',
      name: 'BNB',
      image:
        'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970',
      current_price: 315.91,
      market_cap: 48546752430,
      market_cap_rank: 4,
      fully_diluted_valuation: 48546752430,
      total_volume: 1300487682,
      high_24h: 315.72,
      low_24h: 307.73,
      price_change_24h: 3.18,
      price_change_percentage_24h: 1.01748,
      market_cap_change_24h: 325568118,
      market_cap_change_percentage_24h: 0.67516,
      circulating_supply: 153856150,
      total_supply: 153856150,
      max_supply: 200000000,
      ath: 686.31,
      ath_change_percentage: -54.02443,
      ath_date: '2021-05-10T07:24:17.097Z',
      atl: 0.0398177,
      atl_change_percentage: 792345.09678,
      atl_date: '2017-10-19T00:00:00.000Z',
      roi: null,
      last_updated: '2024-01-19T14:04:53.685Z',
    },
    {
      id: 'solana',
      symbol: 'sol',
      name: 'Solana',
      image:
        'https://assets.coingecko.com/coins/images/4128/large/solana.png?1696504756',
      current_price: 94.05,
      market_cap: 40708045420,
      market_cap_rank: 5,
      fully_diluted_valuation: 53384683778,
      total_volume: 2498806708,
      high_24h: 99.11,
      low_24h: 91.53,
      price_change_24h: -4.46122580929098,
      price_change_percentage_24h: -4.52848,
      market_cap_change_24h: -2012134534.4091568,
      market_cap_change_percentage_24h: -4.71003,
      circulating_supply: 432790693.745879,
      total_supply: 567563342.557037,
      max_supply: null,
      ath: 259.96,
      ath_change_percentage: -63.768,
      ath_date: '2021-11-06T21:54:35.825Z',
      atl: 0.500801,
      atl_change_percentage: 18707.54961,
      atl_date: '2020-05-11T19:35:23.449Z',
      roi: null,
      last_updated: '2024-01-19T14:05:25.375Z',
    },
    {
      id: 'ripple',
      symbol: 'xrp',
      name: 'XRP',
      image:
        'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442',
      current_price: 0.548556,
      market_cap: 29836312012,
      market_cap_rank: 6,
      fully_diluted_valuation: 54900287300,
      total_volume: 1089962517,
      high_24h: 0.563883,
      low_24h: 0.545014,
      price_change_24h: -0.012644002633221851,
      price_change_percentage_24h: -2.25303,
      market_cap_change_24h: -630583545.9343185,
      market_cap_change_percentage_24h: -2.06973,
      circulating_supply: 54339837728,
      total_supply: 99987984506,
      max_supply: 100000000000,
      ath: 3.4,
      ath_change_percentage: -83.84355,
      ath_date: '2018-01-07T00:00:00.000Z',
      atl: 0.00268621,
      atl_change_percentage: 20340.30544,
      atl_date: '2014-05-22T00:00:00.000Z',
      roi: null,
      last_updated: '2024-01-19T14:05:08.849Z',
    },
  ];

  return of({
    all: allCoins,
    top: allCoins.slice(0, 6),
    trending: allCoins
      .sort(
        (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
      )
      .slice(0, 6),
  });
};
