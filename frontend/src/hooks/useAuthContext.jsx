import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

//custom hook
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  // error check (making sure context is available)
  //check that AuthContext is inside of the AuthContext.Provider

  if (!context) {
    throw Error("useAuthContext must be used inside of AuthContextProvider");
  }

  return context;
};
