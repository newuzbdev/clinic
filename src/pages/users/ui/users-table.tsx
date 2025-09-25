import {
  Table,
  Button,
  ActionIcon,
  Group,
  Text,
  Badge,
  LoadingOverlay,
  Alert,
  Box
} from '@mantine/core'
import { Edit, Trash2, Plus } from 'lucide-react'
import { useGetAllUsers, useDeleteUser, type TUser } from '../../../config/querys/users-query'
import { notifications } from '@mantine/notifications'

interface UsersTableProps {
  onEdit: (user: TUser) => void
  onAdd: () => void
}

const UsersTable = ({ onEdit, onAdd }: UsersTableProps) => {
  const { data: users, isLoading, error } = useGetAllUsers()
  const deleteUserMutation = useDeleteUser()

  const handleDeleteUser = async (user: TUser) => {
    if (window.confirm(`Are you sure you want to delete user "${user.username}"?`)) {
      try {
        await deleteUserMutation.mutateAsync(user.id)
        notifications.show({
          title: 'Success',
          message: 'User deleted successfully',
          color: 'green'
        })
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Failed to delete user',
          color: 'red'
        })
      }
    }
  }

  const getRoleBadgeColor = (roleId: number) => {
    switch (roleId) {
      case 1: return 'red'    // Admin
      case 2: return 'blue'   // Doctor
      case 3: return 'green'  // Nurse
      case 4: return 'yellow' // Receptionist
      default: return 'gray'
    }
  }

  const getRoleName = (roleId: number) => {
    switch (roleId) {
      case 1: return 'Admin'
      case 2: return 'Doctor'
      case 3: return 'Nurse'
      case 4: return 'Receptionist'
      default: return 'Unknown'
    }
  }

  if (error) {
    return (
      <Alert color="red" title="Error">
        Failed to load users: {error.message}
      </Alert>
    )
  }

  const rows = users?.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>
        <Text size="sm" fw={500}>
          {user.name}
        </Text>
        <Text size="xs" c="dimmed">
          {user.username}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed">
          {user.phone}
        </Text>
      </Table.Td>
      <Table.Td>
        <Badge color={getRoleBadgeColor(user.role_id)} variant="light">
          {getRoleName(user.role_id)}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed">
          {new Date(user.createdAt).toLocaleDateString()}
        </Text>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon
            variant="subtle"
            color="blue"
            onClick={() => onEdit(user)}
          >
            <Edit size={16} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={() => handleDeleteUser(user)}
            loading={deleteUserMutation.isPending}
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
          Users Management
        </Text>
        <Button
          leftSection={<Plus size={16} />}
          onClick={onAdd}
        >
          Add User
        </Button>
      </Group>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Created At</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows?.length ? rows : (
            <Table.Tr>
              <Table.Td colSpan={5}>
                <Text ta="center" c="dimmed">
                  No users found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </Box>
  )
}

export default UsersTable