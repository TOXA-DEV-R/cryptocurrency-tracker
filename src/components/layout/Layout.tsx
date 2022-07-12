/** @format */

import React, { FC } from "react";
import { LayoutProps } from "../../types";
import Footer from "./Footer";
import Header from "./Header";

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
