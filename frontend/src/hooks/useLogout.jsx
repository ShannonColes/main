import { useAuthContext } from "./useAuthContext";

// clear storage
export const useLogout = () => {
  
  const { dispatch } = useAuthContext(); //dispatch to change authContext

  const logout = () => {

    localStorage.removeItem("User");

    // update authContext - clear out
    dispatch({ type: "LOGOUT" });

  };
    return { logout };
};
