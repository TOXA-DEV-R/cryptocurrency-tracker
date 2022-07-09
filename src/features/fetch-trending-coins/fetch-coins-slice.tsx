/** @format */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface CoinTypes {
  id?: number;
  currency?: string;
  days?: number;
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
  }),
});

export { fetchCoinsSlice };
export const { useTrendingCoinsQuery } = fetchCoinsSlice;
