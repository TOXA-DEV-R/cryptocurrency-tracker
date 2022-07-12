/** @format */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface CoinTypes {
  id?: number;
  days?: number;
  currency?: string;
}

const fetchCoinsSlice = createApi({
  reducerPath: "coins-api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3/coins/",
  }),
  endpoints: (builder) => ({
    trendingCoins: builder.query<any, string>({
      query: (currency: string) =>
        `markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`,
    }),
    coinsList: builder.query<any, string>({
      query: (currency: string) =>
        `markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
    }),
    singleCoin: builder.query<any, string>({
      query: (id: string) => id,
    }),
    historicalChart: builder.query<any, CoinTypes>({
      query: (props: CoinTypes) =>
        `${props.id}/market_chart?vs_currency=${props.currency}&days=${props.days}`,
    }),
  }),
});

export { fetchCoinsSlice };
export const {
  useTrendingCoinsQuery,
  useCoinsListQuery,
  useSingleCoinQuery,
  useHistoricalChartQuery,
} = fetchCoinsSlice;
