import { useState } from 'react'
import {
  Table,
  Button,
  ActionIcon,
  Group,
  Text,
  LoadingOverlay,
  Alert,
  Box,
  Modal
} from '@mantine/core'
import { Edit, Trash2, Plus } from 'lucide-react'
import { useGetAllDepartaments, useDeleteDepartament, type TDepartament } from '../../../config/querys/departament-query'
import { notifications } from '@mantine/notifications'

interface DepartamentTableProps {
  onEdit: (departament: TDepartament) => void
  onAdd: () => void
}

const DepartamentTable = ({ onEdit, onAdd }: DepartamentTableProps) => {
  const { data: departaments, isLoading, error } = useGetAllDepartaments()
  const deleteDepartamentMutation = useDeleteDepartament()
  const [deleteModalOpened, setDeleteModalOpened] = useState(false)
  const [departamentToDelete, setDepartamentToDelete] = useState<TDepartament | null>(null)

  const handleDeleteClick = (departament: TDepartament) => {
    setDepartamentToDelete(departament)
    setDeleteModalOpened(true)
  }

  const handleConfirmDelete = async () => {
    if (!departamentToDelete) return
    try {
      await deleteDepartamentMutation.mutateAsync(departamentToDelete.id)
      notifications.show({
        title: 'Success',
        message: 'Departament deleted successfully',
        color: 'green'
      })
      setDeleteModalOpened(false)
      setDepartamentToDelete(null)
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to delete departament',
        color: 'red'
      })
    }
  }

  if (error) {
    return (
      <Alert color="red" title="Error">
        Failed to load departaments: {error.message}
      </Alert>
    )
  }

  const rows = departaments?.map((departament) => (
    <Table.Tr key={departament.id}>
      <Table.Td>
        <Text size="sm" fw={500}>
          {departament.name}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed">
          {departament.owner_id}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed">
          {new Date(departament.createdAt).toLocaleDateString()}
        </Text>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon
            variant="subtle"
            color="blue"
            onClick={() => onEdit(departament)}
          >
            <Edit size={16} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={() => handleDeleteClick(departament)}
            loading={deleteDepartamentMutation.isPending}
          >
            <Trash2 size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <Box pos="relative">
      <LoadingOverlay visible={isLoading} />

      <Group justify="space-between" mb="md">
        <Text size="lg" fw={600}>
          Departaments Management
        </Text>
        <Button
          leftSection={<Plus size={16} />}
          onClick={onAdd}
        >
          Add Departament
        </Button>
      </Group>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Owner ID</Table.Th>
            <Table.Th>Created At</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows?.length ? rows : (
            <Table.Tr>
              <Table.Td colSpan={4}>
                <Text ta="center" c="dimmed">
                  No departaments found
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
          Are you sure you want to delete departament "{departamentToDelete?.name}"? This action cannot be undone.
        </Text>
        <Group justify="flex-end" mt="md">
          <Button variant="subtle" onClick={() => setDeleteModalOpened(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleConfirmDelete} loading={deleteDepartamentMutation.isPending}>
            Delete
          </Button>
        </Group>
      </Modal>
    </Box>
  )
}

export default DepartamentTable