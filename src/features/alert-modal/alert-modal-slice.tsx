/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertModalTypes } from "../../types";

const initialState: AlertModalTypes = {
  open: false,
  message: "",
  type: "error",
};

const alertModalSlice = createSlice({
  name: "alert-modal",
  initialState,
  reducers: {
    controlAlertModal: (
      state: AlertModalTypes,
      action: PayloadAction<AlertModalTypes>
    ) => {
      return action.payload;
    },
  },
});

export const { controlAlertModal } = alertModalSlice.actions;
export default alertModalSlice.reducer;
