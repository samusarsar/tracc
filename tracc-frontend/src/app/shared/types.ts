export type UserData = {
  id: string;
  email: string;
  name: string;
  token: string;
};

export type AuthResponse = {
  _id: string;
  email: string;
  name: string;
};

export type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  circulating_supply: number;
  total_supply: number;
};
