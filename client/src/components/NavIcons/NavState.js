import React, { createContext, useContext, useState } from "react";

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <AppStateContext.Provider value={{ showSettings, setShowSettings }}>
      {children}
    </AppStateContext.Provider>
  );
};
export const useAppState = () => {
  return useContext(AppStateContext);
};