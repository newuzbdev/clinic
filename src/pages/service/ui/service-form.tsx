import { useEffect } from 'react'
import {
  TextInput,
  NumberInput,
  Select,
  Button,
  Group,
  Stack
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useAddService, useUpdateService, type TService, type TAddServiceRequest, type TUpdateServiceRequest } from '../../../config/querys/service-query'
import { useGetAllDepartaments } from '../../../config/querys/departament-query'
import { notifications } from '@mantine/notifications'

interface ServiceFormProps {
  service?: TService | null
  onSuccess: () => void
  onCancel: () => void
}

const ServiceForm = ({ service, onSuccess, onCancel }: ServiceFormProps) => {
  const addServiceMutation = useAddService()
  const updateServiceMutation = useUpdateService()
  const { data: departaments } = useGetAllDepartaments()

  const isEditing = !!service

  const form = useForm({
    initialValues: {
      name: service?.name || '',
      price: service?.price || 0,
      departament_id: service?.departament_id.toString() || '1'
    },
    validate: {
      name: (value: string) => {
        if (!value.trim()) return 'Name is required'
        if (value.length < 2) return 'Name must be at least 2 characters'
        return null
      },
      price: (value: number) => {
        if (value < 0) return 'Price must be non-negative'
        return null
      },
      departament_id: (value: string) => {
        if (!value) return 'Departament is required'
        return null
      }
    }
  })

  useEffect(() => {
    if (service) {
      form.setValues({
        name: service.name,
        price: service.price,
        departament_id: service.departament_id.toString()
      })
    }
  }, [service])

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const departamentId = parseInt(values.departament_id)

      if (isEditing && service) {
        const updateData: TUpdateServiceRequest = {
          name: values.name,
          price: values.price,
          departament_id: departamentId
        }

        await updateServiceMutation.mutateAsync({
          id: service.id,
          serviceData: updateData
        })

        notifications.show({
          title: 'Success',
          message: 'Service updated successfully',
          color: 'green'
        })
      } else {
        const addData: TAddServiceRequest = {
          name: values.name,
          price: values.price,
          departament_id: departamentId,
          has_file: 0
        }

        await addServiceMutation.mutateAsync(addData)

        notifications.show({
          title: 'Success',
          message: 'Service created successfully',
          color: 'green'
        })
      }

      form.reset()
      onSuccess()
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: `Failed to ${isEditing ? 'update' : 'create'} service`,
        color: 'red'
      })
    }
  }

  const departamentOptions = departaments?.map(departament => ({
    value: departament.id.toString(),
    label: departament.name
  })) || []

  const hasFileOptions = [
    { value: '0', label: 'No' },
    { value: '1', label: 'Yes' }
  ]

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <TextInput
          label="Service Name"
          placeholder="Enter service name"
          required
          {...form.getInputProps('name')}
        />

        <NumberInput
          label="Price"
          placeholder="Enter price"
          required
          min={0}
          decimalScale={2}
          {...form.getInputProps('price')}
        />

        <Select
          label="Departament"
          placeholder="Select departament"
          data={departamentOptions}
          required
          {...form.getInputProps('departament_id')}
        />

        <Group justify="flex-end" mt="md">
          <Button
            variant="subtle"
            onClick={onCancel}
            disabled={addServiceMutation.isPending || updateServiceMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={addServiceMutation.isPending || updateServiceMutation.isPending}
          >
            {isEditing ? 'Update Service' : 'Create Service'}
          </Button>
        </Group>
      </Stack>
    </form>
  )
}

export default ServiceForm