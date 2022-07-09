/** @format */

import { configureStore } from "@reduxjs/toolkit";
import controlMoneySlice from "../features/control-money/controlMoneySlice";

const store = configureStore({
  reducer: controlMoneySlice,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
