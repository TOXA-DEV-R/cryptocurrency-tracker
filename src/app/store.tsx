/** @format */

import { configureStore } from "@reduxjs/toolkit";
import controlMoneySlice from "../features/control-money/controlMoneySlice";
import { fetchCoinsSlice } from "../features/fetch-trending-coins/fetch-coins-slice";
import userSlice from "../features/user/user-slice";

const store = configureStore({
  reducer: {
    controlMoney: controlMoneySlice,
    user: userSlice,
    [fetchCoinsSlice.reducerPath]: fetchCoinsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fetchCoinsSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
