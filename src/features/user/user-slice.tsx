/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserTypes } from "../../types";

const initialState: UserTypes = {
  email: "",
  password: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    controlUser(state: UserTypes, action: PayloadAction<UserTypes>) {},
  },
});

export const { controlUser } = userSlice.actions;
export default userSlice.reducer;
