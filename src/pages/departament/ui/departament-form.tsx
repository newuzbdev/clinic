import { useEffect } from 'react'
import {
  TextInput,
  NumberInput,
  Button,
  Group,
  Stack
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useAddDepartament, useUpdateDepartament, type TDepartament, type TAddDepartamentRequest, type TUpdateDepartamentRequest } from '../../../config/querys/departament-query'
import { notifications } from '@mantine/notifications'

interface DepartamentFormProps {
  departament?: TDepartament | null
  onSuccess: () => void
  onCancel: () => void
}

const DepartamentForm = ({ departament, onSuccess, onCancel }: DepartamentFormProps) => {
  const addDepartamentMutation = useAddDepartament()
  const updateDepartamentMutation = useUpdateDepartament()

  const isEditing = !!departament

  const form = useForm({
    initialValues: {
      name: departament?.name || '',
      owner_id: departament?.owner_id || 1
    },
    validate: {
      name: (value: string) => {
        if (!value.trim()) return 'Name is required'
        if (value.length < 2) return 'Name must be at least 2 characters'
        return null
      },
      owner_id: (value: number) => {
        if (!value || value < 1) return 'Owner ID must be a positive number'
        return null
      }
    }
  })

  useEffect(() => {
    if (departament) {
      form.setValues({
        name: departament.name,
        owner_id: departament.owner_id
      })
    }
  }, [departament])

  const handleSubmit = async (values: typeof form.values) => {
    try {
      if (isEditing && departament) {
        const updateData: TUpdateDepartamentRequest = {
          name: values.name,
          owner_id: values.owner_id
        }

        await updateDepartamentMutation.mutateAsync({
          id: departament.id,
          departamentData: updateData
        })

        notifications.show({
          title: 'Success',
          message: 'Departament updated successfully',
          color: 'green'
        })
      } else {
        const addData: TAddDepartamentRequest = {
          name: values.name,
          owner_id: values.owner_id
        }

        await addDepartamentMutation.mutateAsync(addData)

        notifications.show({
          title: 'Success',
          message: 'Departament created successfully',
          color: 'green'
        })
      }

      form.reset()
      onSuccess()
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: `Failed to ${isEditing ? 'update' : 'create'} departament`,
        color: 'red'
      })
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <TextInput
          label="Departament Name"
          placeholder="Enter departament name"
          required
          {...form.getInputProps('name')}
        />

        <NumberInput
          label="Owner ID"
          placeholder="Enter owner ID"
          required
          min={1}
          {...form.getInputProps('owner_id')}
        />

        <Group justify="flex-end" mt="md">
          <Button
            variant="subtle"
            onClick={onCancel}
            disabled={addDepartamentMutation.isPending || updateDepartamentMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={addDepartamentMutation.isPending || updateDepartamentMutation.isPending}
          >
            {isEditing ? 'Update Departament' : 'Create Departament'}
          </Button>
        </Group>
      </Stack>
    </form>
  )
}

export default DepartamentForm