import { useState } from 'react'
import {
  Table,
  Button,
  ActionIcon,
  Group,
  Text,
  Badge,
  LoadingOverlay,
  Alert,
  Box,
  Modal
} from '@mantine/core'
import { Edit, Trash2, Plus } from 'lucide-react'
import { useGetAllServices, useDeleteService, type TService } from '../../../config/querys/service-query'
import { useGetAllDepartaments } from '../../../config/querys/departament-query'
import { notifications } from '@mantine/notifications'

interface ServiceTableProps {
  onEdit: (service: TService) => void
  onAdd: () => void
}

const ServiceTable = ({ onEdit, onAdd }: ServiceTableProps) => {
  const { data: services, isLoading: servicesLoading, error: servicesError } = useGetAllServices()
  const { data: departaments } = useGetAllDepartaments()
  const deleteServiceMutation = useDeleteService()
  const [deleteModalOpened, setDeleteModalOpened] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState<TService | null>(null)

  const handleDeleteClick = (service: TService) => {
    setServiceToDelete(service)
    setDeleteModalOpened(true)
  }

  const handleConfirmDelete = async () => {
    if (!serviceToDelete) return
    try {
      await deleteServiceMutation.mutateAsync(serviceToDelete.id)
      notifications.show({
        title: 'Success',
        message: 'Service deleted successfully',
        color: 'green'
      })
      setDeleteModalOpened(false)
      setServiceToDelete(null)
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to delete service',
        color: 'red'
      })
    }
  }

  const getDepartamentName = (departamentId: number) => {
    const departament = departaments?.find(d => parseInt(d.id) === departamentId)
    return departament?.name || `Departament ${departamentId}`
  }


  if (servicesError) {
    return (
      <Alert color="red" title="Error">
        Failed to load services: {servicesError.message}
      </Alert>
    )
  }

  const rows = services?.map((service) => (
    <Table.Tr key={service.id}>
      <Table.Td>
        <Text size="sm" fw={500}>
          {service.name}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed">
          ${service.price}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed">
          {getDepartamentName(service.departament_id)}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed">
          {new Date(service.createdAt).toLocaleDateString()}
        </Text>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon
            variant="subtle"
            color="blue"
            onClick={() => onEdit(service)}
          >
            <Edit size={16} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={() => handleDeleteClick(service)}
            loading={deleteServiceMutation.isPending}
          >
            <Trash2 size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <Box pos="relative">
      <LoadingOverlay visible={servicesLoading} />

      <Group justify="space-between" mb="md">
        <Text size="lg" fw={600}>
          Services Management
        </Text>
        <Button
          leftSection={<Plus size={16} />}
          onClick={onAdd}
        >
          Add Service
        </Button>
      </Group>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Departament</Table.Th>
            <Table.Th>Created At</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows?.length ? rows : (
            <Table.Tr>
              <Table.Td colSpan={5}>
                <Text ta="center" c="dimmed">
                  No services found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>

      <Modal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        title="Confirm Delete"
        centered
      >
        <Text>
          Are you sure you want to delete service "{serviceToDelete?.name}"? This action cannot be undone.
        </Text>
        <Group justify="flex-end" mt="md">
          <Button variant="subtle" onClick={() => setDeleteModalOpened(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleConfirmDelete} loading={deleteServiceMutation.isPending}>
            Delete
          </Button>
        </Group>
      </Modal>
    </Box>
  )
}

export default ServiceTable