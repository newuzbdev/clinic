import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { serviceEndpoint } from "../api/endpoint"
import { axiosPrivate } from "../api/api"
import type { AxiosError } from "axios"

export type TService = {
    id: string
    name: string
    price: number
    departament_id: number
    has_file: number
    createdAt: string
    updatedAt: string
}

export type TAddServiceRequest = {
    name: string
    price: number
    departament_id: number
    has_file: number
}

export type TUpdateServiceRequest = {
    name?: string
    price?: number
    departament_id?: number
    has_file?: number
}

export type TServicesResponse = TService[]

// Mock data for development/testing
const mockServices: TService[] = [
    {
        id: '1',
        name: 'Cardiac Consultation',
        price: 150,
        departament_id: 1,
        has_file: 1,
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z'
    },
    {
        id: '2',
        name: 'Neurological Exam',
        price: 200,
        departament_id: 2,
        has_file: 0,
        createdAt: '2024-01-16T09:15:00Z',
        updatedAt: '2024-01-16T09:15:00Z'
    },
    {
        id: '3',
        name: 'Pediatric Checkup',
        price: 100,
        departament_id: 3,
        has_file: 1,
        createdAt: '2024-01-17T14:20:00Z',
        updatedAt: '2024-01-17T14:20:00Z'
    }
]

// Get all services query
export const useGetAllServices = () => {
    return useQuery({
        queryKey: ['services', 'all'],
        queryFn: async () => {
            try {
                const { data } = await axiosPrivate.get<{ map: TService[], total: number }>(
                    serviceEndpoint.getAllServices
                )
                return data.map
            } catch (error) {
                // Return mock data when API fails (for development/testing)
                console.log('API failed, using mock data:', error)
                return mockServices
            }
        }
    })
}

// Add service mutation
export const useAddService = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['services', 'add'],
        mutationFn: async (serviceData: TAddServiceRequest) => {
            return await axiosPrivate.post(serviceEndpoint.addService, serviceData)
        },
        onSuccess: () => {
            // Invalidate and refetch services list
            queryClient.invalidateQueries({ queryKey: ['services', 'all'] })
        },
        onError: (error: AxiosError<any>) => {
            console.error('Error adding service:', error.response?.data)
        }
    })
}

// Update service mutation
export const useUpdateService = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['services', 'update'],
        mutationFn: async ({ id, serviceData }: { id: string; serviceData: TUpdateServiceRequest }) => {
            return await axiosPrivate.patch(serviceEndpoint.updateService(id), serviceData)
        },
        onSuccess: () => {
            // Invalidate and refetch services list
            queryClient.invalidateQueries({ queryKey: ['services', 'all'] })
        },
        onError: (error: AxiosError<any>) => {
            console.error('Error updating service:', error.response?.data)
        }
    })
}

// Delete service mutation
export const useDeleteService = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['services', 'delete'],
        mutationFn: async (id: string) => {
            return await axiosPrivate.delete(serviceEndpoint.deleteService(id))
        },
        onSuccess: () => {
            // Invalidate and refetch services list
            queryClient.invalidateQueries({ queryKey: ['services', 'all'] })
        },
        onError: (error: AxiosError<any>) => {
            console.error('Error deleting service:', error.response?.data)
        }
    })
}