import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signup = async (name, email, password) => {
    setIsLoading(true); //stops button so no extra requests
    setError(null); // ensure there is no error in the state

    // api call
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/signup",
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ); //end of url

      //handle if response is not okay
      //status 200

      if (response.status === 200) {
        // save the user to local storage
        localStorage.setItem("user", JSON.stringify(response.data));

        //update authContext - say user is signed in
        //dispatch with relevant type - 'LOGIN'
        dispatch({ type: "LOGIN", payload: response.data });

        //re-enable the button
        setIsLoading(false);

        navigate(-1);
      }
    } catch (error) {
      console.error(error.response.data.error);
      //update the error state to show on front end
      setError(error.response.data.error);
      setIsLoading(false);
    }
  }; //end of the sign up

  return { signup, isLoading, error };
};
