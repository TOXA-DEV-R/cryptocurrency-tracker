/** @format */

import { SnackbarOrigin } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export type LayoutProps = {
  children: JSX.Element | JSX.Element[];
};

export type CoinsTableDataTypes = {
  image: string;
  name: string;
  id: string;
  symbol: string;
  market_cap_change_percentage_24h: number;
  price_change_percentage_24h: number;
  current_price: number;
  market_cap: number;
};

export type CoinInfoProps = {
  coinId: number;
};

export type controlMoney = {
  currency: string;
  symbol: string;
};

export type UserTypes = any;

export type WatchListTypes = any[];

export type AuthModalCloseTypes = {
  handleClose(): void;
};

export type ChangeEventInput = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export type AlertModalTypes = {
  open: boolean;
  message: string;
  type: string;
};

export type Anchor = "top" | "left" | "bottom" | "right";

export type GlobalContextTypes = {
  children: JSX.Element | JSX.Element[];
};

export type GlobalContextValueTypes = {
  user: {} | any;
  setUser: Dispatch<SetStateAction<{} | any>>;
};
