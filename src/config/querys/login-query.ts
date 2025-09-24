import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { loginEndpoint } from "../api/endpoint"
import { axiosPublic } from "../api/api"
import type { AxiosError, AxiosResponse } from "axios"

export type TLoginRequest = {
    userName: string
    password: string
}
export type TLoginResponse = {
    accessToken: string
}

export type TRefreshResponse = {
    accessToken: string
}

export const useLogin = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationKey: [loginEndpoint.login],
        mutationFn: async (data: TLoginRequest) => {
            return await axiosPublic.post(loginEndpoint.login, data)
        },
        onSuccess: async (response: AxiosResponse<TLoginResponse>) => {
            localStorage.setItem('accessToken', response.data.accessToken)
            
            // Store user information for ProtectedRoute
            // You should replace this with actual user data from your API response
            const userData = {
                role: 'admin', // This should come from your API response
                // Add other user properties as needed
            }
            localStorage.setItem('user', JSON.stringify(userData))

            // Navigate to users page after successful login
            navigate('/users')
        },
        onError: async ({ response }: AxiosError<any>) => {
            console.log(response);

        }
    })
}

export const useRefresh = () => {
    return useMutation({
        mutationKey: [loginEndpoint.refresh],
        mutationFn: async () => {
            return await axiosPublic.post(loginEndpoint.refresh)
        },
        onSuccess: async (response: AxiosResponse<TRefreshResponse>) => {
            localStorage.setItem('accessToken', response.data.accessToken)
        },
        onError: async ({ response }: AxiosError<any>) => {
         console.log(response);
         

           
        }
    })
}

