export type UserData = {
  id: string;
  email: string;
  name: string;
  token: string | undefined;
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

export type Transaction = {
  _id: string;
  coinId: string;
  buyPrice: number;
  buyAmount: number;
  buyDate: Date;
  createdAt: Date;
};

export type Wallet = {
  id: string;
  _id: string;
  name: string;
  description: string;
  owner: string;
  transactions: Transaction[];
  createdAt: Date;
};
