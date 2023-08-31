import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

// define authReducer so we can use in other place
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    case 'SET_PROFILES':
      return { ...state, profiles: action.payload}
    
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null, profiles: [] });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/users/profiles");
        if (response.status === 200) {
          dispatch({ type: "SET_PROFILES", payload: response.data });
        }
      } catch (error) {
        console.error("Error Fetching User Profiles", error);
      }
    };
    fetchProfiles();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
