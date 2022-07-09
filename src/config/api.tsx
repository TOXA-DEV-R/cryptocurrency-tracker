/** @format */

export interface CoinTypes {
  id?: number;
  currency?: string;
  days?: number;
}

const CoinList: Function = (currency: CoinTypes) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

const SingleCoin: Function = (id: CoinTypes) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

const HistoricalChart: Function = (
  id: CoinTypes,
  days: 365,
  currency: CoinTypes
) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

const TrendingCoins: Function = (currency: CoinTypes) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

export { CoinList, SingleCoin, HistoricalChart, TrendingCoins };
