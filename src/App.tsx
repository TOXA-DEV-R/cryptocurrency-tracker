/** @format */

import { FC, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./app.scss";
import styled from "./app.module.css";
import Layout from "./components/layout/Layout";
import CoinPage from "./pages/CoinPage";
import HomePage from "./pages/HomePage";
import AlertModal from "./components/authentication/alert-modal";
import { onAuthStateChanged, Unsubscribe } from "firebase/auth";
import { auth, db } from "./firebase";
import { useGlobalContext } from "./context/context";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useAppDispatch } from "./app/hooks";
import { addWatchList } from "./features/watch-list/watch-list";

const App: FC = () => {
  const { setUser, user } = useGlobalContext();
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      var unsubscribe: Unsubscribe = onSnapshot(
        collection(db, "watchList"),
        (snapshot) => {
          console.log(snapshot.docs);
        }
      );

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  return (
    <>
      <div className={styled.app}>
        <Layout>
          <Routes>
            <Route path="/">
              <Route index element={<HomePage />} />
              <Route path="coins/:id" element={<CoinPage />} />
            </Route>
          </Routes>
        </Layout>
      </div>
      <AlertModal />
    </>
  );
};

export default App;
