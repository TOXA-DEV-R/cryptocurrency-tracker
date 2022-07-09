/** @format */

import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
