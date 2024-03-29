export const apiRoutes = {
  BASE: 'https://tracc-server.vercel.app/api',
  SIGNUP: '/auth/signup',
  LOGIN: '/auth/login',
  CREATE_WALLET: '/wallets/create',
  GET_WALLETS(email: string) {
    return `/wallets/${email}`;
  },
  WALLET_ID_REQUESTS(id: string) {
    return `/wallets/${id}`;
  },
};

export const coinApiEndpoints = {
  MARKET_TOP_TEN:
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false',
  MARKET_TOP_100:
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false',
};
