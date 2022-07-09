/** @format */

import { configureStore } from "@reduxjs/toolkit";
import controlMoneySlice from "../features/control-money/controlMoneySlice";
import { fetchCoinsSlice } from "../features/fetch-trending-coins/fetch-coins-slice";

const store = configureStore({
  reducer: {
    controlMoney: controlMoneySlice,
    [fetchCoinsSlice.reducerPath]: fetchCoinsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fetchCoinsSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
