import axios from "axios";
import { useState } from "react";
import {useAuthContext} from "./useAuthContext"
import {useNavigate} from 'react-router-dom'


export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, SetIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
    const navigate = useNavigate()

    const login = async (email, password) => {
        SetIsLoading(true)
        setError(null)
        try{
            const response = await axios.post('http://localhost:4000/api/users/login', 
                { email, password }, 
                { headers: { 'Content-Type': 'application/json' } }
            );
        if (response.status !== 200){
            SetIsLoading(false)
            setError(error.response.data.error)
        }
        if (response.status === 200)  {
            localStorage.setItem('user', JSON.stringify(response.data))
            dispatch({type: 'LOGIN', payload: response.data})

            SetIsLoading(false)

            navigate(-1)
        }
        console.log(response)
        }   catch   (error){
            console.error(error.response.data.error)
            setError(error.response.data.error)
            SetIsLoading(false)
        }
    }
    return {login, isLoading, error}
}