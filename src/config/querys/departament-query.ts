import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { departamentEndpoint } from "../api/endpoint"
import { axiosPrivate } from "../api/api"
import type { AxiosError } from "axios"

export type TDepartament = {
    id: string
    name: string
    owner_id: number
    createdAt: string
    updatedAt: string
}

export type TAddDepartamentRequest = {
    name: string
    owner_id: number
}

export type TUpdateDepartamentRequest = {
    name?: string
    owner_id?: number
}

export type TDepartamentsResponse = TDepartament[]

// Mock data for development/testing
const mockDepartaments: TDepartament[] = [
    {
        id: '1',
        name: 'Cardiology',
        owner_id: 1,
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z'
    },
    {
        id: '2',
        name: 'Neurology',
        owner_id: 1,
        createdAt: '2024-01-16T09:15:00Z',
        updatedAt: '2024-01-16T09:15:00Z'
    },
    {
        id: '3',
        name: 'Pediatrics',
        owner_id: 1,
        createdAt: '2024-01-17T14:20:00Z',
        updatedAt: '2024-01-17T14:20:00Z'
    }
]

// Get all departaments query
export const useGetAllDepartaments = () => {
    return useQuery({
        queryKey: ['departaments', 'all'],
        queryFn: async () => {
            try {
                const { data } = await axiosPrivate.get<{ map: TDepartament[], total: number }>(
                    departamentEndpoint.getAllDepartaments
                )
                return data.map
            } catch (error) {
                // Return mock data when API fails (for development/testing)
                console.log('API failed, using mock data:', error)
                return mockDepartaments
            }
        }
    })
}

// Add departament mutation
export const useAddDepartament = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['departaments', 'add'],
        mutationFn: async (departamentData: TAddDepartamentRequest) => {
            return await axiosPrivate.post(departamentEndpoint.addDepartament, departamentData)
        },
        onSuccess: () => {
            // Invalidate and refetch departaments list
            queryClient.invalidateQueries({ queryKey: ['departaments', 'all'] })
        },
        onError: (error: AxiosError<any>) => {
            console.error('Error adding departament:', error.response?.data)
        }
    })
}

// Update departament mutation
export const useUpdateDepartament = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['departaments', 'update'],
        mutationFn: async ({ id, departamentData }: { id: string; departamentData: TUpdateDepartamentRequest }) => {
            return await axiosPrivate.patch(departamentEndpoint.updateDepartament(id), departamentData)
        },
        onSuccess: () => {
            // Invalidate and refetch departaments list
            queryClient.invalidateQueries({ queryKey: ['departaments', 'all'] })
        },
        onError: (error: AxiosError<any>) => {
            console.error('Error updating departament:', error.response?.data)
        }
    })
}

// Delete departament mutation
export const useDeleteDepartament = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['departaments', 'delete'],
        mutationFn: async (id: string) => {
            return await axiosPrivate.delete(departamentEndpoint.deleteDepartament(id))
        },
        onSuccess: () => {
            // Invalidate and refetch departaments list
            queryClient.invalidateQueries({ queryKey: ['departaments', 'all'] })
        },
        onError: (error: AxiosError<any>) => {
            console.error('Error deleting departament:', error.response?.data)
        }
    })
}