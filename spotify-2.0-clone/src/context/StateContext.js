import React, { createContext, useContext, useReducer } from "react";


export const StateContext = createContext();

export const useStateProvider = () => useContext(StateContext);

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
