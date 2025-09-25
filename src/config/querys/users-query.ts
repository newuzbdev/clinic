import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { usersEndpoint } from "../api/endpoint"
import { axiosPrivate } from "../api/api"
import type { AxiosError } from "axios"

export type TUser = {
    id: string
    name: string
    username: string
    phone: string
    role_id: number
    chat_id: number
    photo: string
    createdAt: string
    updatedAt: string
}

export type TAddUserRequest = {
    name: string
    username: string
    password: string
    phone: string
    role_id: number
    chat_id: number
    photo: string
}

export type TUpdateUserRequest = {
    name?: string
    username?: string
    phone?: string
    role_id?: number
    chat_id?: number
    photo?: string
}

export type TUsersResponse = TUser[]

// Mock data for development/testing
const mockUsers: TUser[] = [
    {
        id: '1',
        name: 'John Smith',
        username: 'johnsmith',
        phone: '+1-555-0123',
        role_id: 1,
        chat_id: 12345,
        photo: 'https://via.placeholder.com/150',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z'
    },
    {
        id: '2',
        name: 'Dr. Sarah Johnson',
        username: 'sarahjohnson',
        phone: '+1-555-0124',
        role_id: 2,
        chat_id: 12346,
        photo: 'https://via.placeholder.com/150',
        createdAt: '2024-01-16T09:15:00Z',
        updatedAt: '2024-01-16T09:15:00Z'
    },
    {
        id: '3',
        name: 'Nurse Mary Wilson',
        username: 'marywilson',
        phone: '+1-555-0125',
        role_id: 3,
        chat_id: 12347,
        photo: 'https://via.placeholder.com/150',
        createdAt: '2024-01-17T14:20:00Z',
        updatedAt: '2024-01-17T14:20:00Z'
    },
    {
        id: '4',
        name: 'Alice Brown',
        username: 'alicebrown',
        phone: '+1-555-0126',
        role_id: 4,
        chat_id: 12348,
        photo: 'https://via.placeholder.com/150',
        createdAt: '2024-01-18T11:45:00Z',
        updatedAt: '2024-01-18T11:45:00Z'
    }
]

// Get all users query
export const useGetAllUsers = () => {
    return useQuery({
        queryKey: ['users', 'all'],
        queryFn: async () => {
            try {
                const { data } = await axiosPrivate.get<{ map: TUser[], total: number }>(
                    usersEndpoint.getAllUsers
                )
                return data.map
            } catch (error) {
                // Return mock data when API fails (for development/testing)
                console.log('API failed, using mock data:', error)
                return mockUsers
            }
        }
    })
}

// Add user mutation
export const useAddUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['users', 'add'],
        mutationFn: async (userData: TAddUserRequest) => {
            return await axiosPrivate.post(usersEndpoint.addUser, userData)
        },
        onSuccess: () => {
            // Invalidate and refetch users list
            queryClient.invalidateQueries({ queryKey: ['users', 'all'] })
        },
        onError: (error: AxiosError<any>) => {
            console.error('Error adding user:', error.response?.data)
        }
    })
}

// Update user mutation
export const useUpdateUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['users', 'update'],
        mutationFn: async ({ id, userData }: { id: string; userData: TUpdateUserRequest }) => {
            return await axiosPrivate.patch(usersEndpoint.updateUser(id), userData)
        },
        onSuccess: () => {
            // Invalidate and refetch users list
            queryClient.invalidateQueries({ queryKey: ['users', 'all'] })
        },
        onError: (error: AxiosError<any>) => {
            console.error('Error updating user:', error.response?.data)
        }
    })
}

// Delete user mutation
export const useDeleteUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['users', 'delete'],
        mutationFn: async (id: string) => {
            return await axiosPrivate.delete(usersEndpoint.deleteUser(id))
        },
        onSuccess: () => {
            // Invalidate and refetch users list
            queryClient.invalidateQueries({ queryKey: ['users', 'all'] })
        },
        onError: (error: AxiosError<any>) => {
            console.error('Error deleting user:', error.response?.data)
        }
    })
}