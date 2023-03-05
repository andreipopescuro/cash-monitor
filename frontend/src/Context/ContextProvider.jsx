import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const UserProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [user, setUser] = useState("");
  const [deposits, setDeposits] = useState("");
  const [withdraws, setWithdraws] = useState("");

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("monitorUser"));
    setUser(userInfo);
  }, [connected]);
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        deposits,
        setDeposits,
        withdraws,
        setWithdraws,
        connected,
        setConnected,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const AppState = () => {
  return useContext(AppContext);
};
export default UserProvider;
