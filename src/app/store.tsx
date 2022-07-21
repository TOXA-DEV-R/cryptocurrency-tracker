/** @format */

import { configureStore } from "@reduxjs/toolkit";
import alertModalSlice from "../features/alert-modal/alert-modal-slice";
import controlMoneySlice from "../features/control-money/controlMoneySlice";
import { fetchCoinsSlice } from "../features/fetch-trending-coins/fetch-coins-slice";
import watchListSlice from "../features/watch-list/watch-list";

const store = configureStore({
  reducer: {
    controlMoney: controlMoneySlice,
    alertModal: alertModalSlice,
    watchList: watchListSlice,
    [fetchCoinsSlice.reducerPath]: fetchCoinsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fetchCoinsSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
