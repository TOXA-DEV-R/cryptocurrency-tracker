/** @format */

export type LayoutProps = {
  children: JSX.Element | JSX.Element[];
};

export type CoinsTableDataTypes = {
  image: string;
  name: string;
  id: string;
  symbol: string;
  market_cap_change_percentage_24h: number;
  price_change_percentage_24h: number;
  current_price: number;
  market_cap: number;
};

export type CoinInfoProps = {
  coinId: number;
};

export type controlMoney = {
  currency: string;
  symbol: string;
};

export type UserTypes = {
  email: string;
  password: string;
};

export type AuthModalCloseTypes = {
  handleClose(): void;
};
