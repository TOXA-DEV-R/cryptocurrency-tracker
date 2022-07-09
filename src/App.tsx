/** @format */

import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import "./app.scss";
import { makeStyles } from "@material-ui/core";
import Layout from "./components/layout/Layout";
import CoinPage from "./pages/CoinPage";
import HomePage from "./pages/HomePage";

const useStyles = makeStyles(() => ({
  app: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

const App: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <Layout>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="coins/:id" element={<CoinPage />} />
          </Route>
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
