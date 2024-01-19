export const apiRoutes = {
  BASE: 'http://localhost:8080/api',
  SIGNUP: '/auth/signup',
  LOGIN: '/auth/login',
};

export const coinApiEndpoints = {
  MARKET_TOP_TEN:
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false',
};