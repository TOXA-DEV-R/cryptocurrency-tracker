/** @format */

import { createContext, useContext, useState } from "react";
import { GlobalContextTypes, GlobalContextValueTypes } from "../types";

const CreateGlobalContext = createContext<GlobalContextValueTypes | any>(null);

const GlobalContextProvider = ({ children }: GlobalContextTypes) => {
  const [user, setUser] = useState<{} | any>({});

  const values: GlobalContextValueTypes = {
    user,
    setUser,
  };

  return (
    <CreateGlobalContext.Provider value={values}>
      {children}
    </CreateGlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(CreateGlobalContext);
};

export { GlobalContextProvider, useGlobalContext };
