import React, { createContext, useReducer } from "react";
import rods from "./reducer/rods";
import rodsInitialState from "./initialstate/rodsInitialState";
export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const [rodsState, rodsDispatch] = useReducer(rods, rodsInitialState);

  return (
    <GlobalContext.Provider
      value={{
        rodsState,
        rodsDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
