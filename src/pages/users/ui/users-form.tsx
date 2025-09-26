import { useEffect } from 'react'
import { 
  TextInput, 
  Select, 
  Button, 
  Group, 
  Stack,
  PasswordInput
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useAddUser, useUpdateUser, type TUser, type TAddUserRequest, type TUpdateUserRequest } from '../../../config/querys/users-query'
import { notifications } from '@mantine/notifications'

interface UsersFormProps {
  user?: TUser | null
  onSuccess: () => void
  onCancel: () => void
}

const UsersForm = ({ user, onSuccess, onCancel }: UsersFormProps) => {
  const addUserMutation = useAddUser()
  const updateUserMutation = useUpdateUser()
  
  const isEditing = !!user

  const form = useForm({
    initialValues: {
      name: user?.name || '',
      username: user?.username || '',
      password: '',
      phone: user?.phone || '',
      role_id: user?.role_id.toString() || '4',
      chat_id: user?.chat_id || 1,
      photo: user?.photo || ''
    },
    validate: {
      name: (value: string) => {
        if (!value.trim()) return 'Name is required'
        if (value.length < 2) return 'Name must be at least 2 characters'
        return null
      },
      username: (value: string) => {
        if (!value.trim()) return 'Username is required'
        if (value.length < 3) return 'Username must be at least 3 characters'
        return null
      },
      phone: (value: string) => {
        if (!value.trim()) return 'Phone is required'
        if (!/^\+?[\d\s\-\(\)]+$/.test(value)) return 'Invalid phone format'
        return null
      },
      password: (value: string) => {
        if (!isEditing && !value.trim()) return 'Password is required'
        if (value && value.length < 6) return 'Password must be at least 6 characters'
        return null
      },
      role_id: (value: string) => !value ? 'Role is required' : null
    }
  })

  useEffect(() => {
    if (user) {
      form.setValues({
        name: user.name,
        username: user.username,
        password: '',
        phone: user.phone,
        role_id: user.role_id.toString(),
        chat_id: user.chat_id,
        photo: user.photo
      })
    }
  }, [user])

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const roleId = parseInt(values.role_id)

      if (isEditing && user) {
        const updateData: TUpdateUserRequest = {
          name: values.name,
          username: values.username,
          phone: values.phone,
          role_id: roleId,
          chat_id: values.chat_id,
          photo: values.photo
        }

        await updateUserMutation.mutateAsync({
          id: user.id,
          userData: updateData
        })

        notifications.show({
          title: 'Success',
          message: 'User updated successfully',
          color: 'green'
        })
      } else {
        const addData: TAddUserRequest = {
          name: values.name,
          username: values.username,
          password: values.password,
          phone: values.phone,
          role_id: roleId,
          chat_id: values.chat_id,
          photo: values.photo
        }

        await addUserMutation.mutateAsync(addData)

        notifications.show({
          title: 'Success',
          message: 'User created successfully',
          color: 'green'
        })
      }

      form.reset()
      onSuccess()
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: `Failed to ${isEditing ? 'update' : 'create'} user`,
        color: 'red'
      })
    }
  }

  const roleOptions = [
    { value: '1', label: 'Admin' },
    { value: '2', label: 'Doctor' },
    { value: '3', label: 'Nurse' },
    { value: '4', label: 'Receptionist' }
  ]

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <TextInput
          label="Full Name"
          placeholder="Enter full name"
          required
          {...form.getInputProps('name')}
        />

        <TextInput
          label="Username"
          placeholder="Enter username"
          required
          {...form.getInputProps('username')}
        />

        <TextInput
          label="Phone"
          placeholder="Enter phone number"
          required
          {...form.getInputProps('phone')}
        />

        {!isEditing && (
          <PasswordInput
            label="Password"
            placeholder="Enter password"
            required
            {...form.getInputProps('password')}
          />
        )}

        <Select
          label="Role"
          placeholder="Select role"
          data={roleOptions}
          required
          {...form.getInputProps('role_id')}
        />

        <TextInput
          label="Chat ID"
          placeholder="Enter chat ID"
          type="number"
          {...form.getInputProps('chat_id')}
        />

        <TextInput
          label="Photo URL"
          placeholder="Enter photo URL (optional)"
          {...form.getInputProps('photo')}
        />

        <Group justify="flex-end" mt="md">
          <Button 
            variant="subtle" 
            onClick={onCancel}
            disabled={addUserMutation.isPending || updateUserMutation.isPending}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            loading={addUserMutation.isPending || updateUserMutation.isPending}
          >
            {isEditing ? 'Update User' : 'Create User'}
          </Button>
        </Group>
      </Stack>
    </form>
  )
}

export default UsersForm