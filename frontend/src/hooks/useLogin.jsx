import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true); //only one sign up request at a time
    setError(null); //check for error in the state

    // api call
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json,",
          },
        }
      ); // end of url

      //   if response is not okay
      // if okay status 200
      if (response.status !== 200) {
        setIsLoading(false);
        setError(error.response.data.error);
      }

      // if response is okay
      // status 200
      if (response.status === 200) {
        // save the user to local storage
        localStorage.setItem("user", JSON.stringify(response.data));

        // update authContext - user is signed in
        // dispatch relevant type - 'LOGIN'
        dispatch({ type: "LOGIN", payload: response.data });

        // re-enable button
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error.response.data.error);
      // update error to show on frontend
      setError(error.response.data.error);
      setIsLoading(false);
    }
  }; //end of the login in

  return { login, isLoading, error }; //
};
