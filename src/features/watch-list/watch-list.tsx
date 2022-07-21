/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WatchListTypes } from "../../types";

const initialState: WatchListTypes = [];

const watchListSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    controlWatchList(
      state: WatchListTypes,
      action: PayloadAction<WatchListTypes>
    ) {
      return action.payload;
    },
    addWatchList(state: WatchListTypes, action: PayloadAction<string>) {
      console.log(state.map((item) => item));
      return [...state, action.payload];
    },
  },
});

export const { controlWatchList, addWatchList } = watchListSlice.actions;
export default watchListSlice.reducer;
