/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface controlMoney {
  currency: string;
  symbol: string;
}

const initialState: controlMoney = {
  currency: "USD",
  symbol: "$",
};

const controlMoneySlice = createSlice({
  name: "control-money",
  initialState,
  reducers: {
    controlCurrency(state: controlMoney, action: PayloadAction<string>) {
      if (action.payload === "INR") {
        return {
          currency: "INR",
          symbol: "₹",
        };
      } else if (action.payload === "USD") {
        return {
          currency: "USD",
          symbol: "$",
        };
      }
    },
  },
});

export const { controlCurrency } = controlMoneySlice.actions;
export default controlMoneySlice.reducer;
