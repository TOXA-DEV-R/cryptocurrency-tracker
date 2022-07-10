/** @format */

export const numberWithCommas = (x: string): string => {
  return x.replace(/B(?=(\d{3})+(?!\d))/g, ",");
};
