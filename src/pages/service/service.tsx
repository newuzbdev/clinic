import { useState } from 'react'
import { Container, Text } from '@mantine/core'
import ServiceTable from './ui/service-table'
import ServiceModal from './ui/service-modal'
import { type TService } from '../../config/querys/service-query'

const Service = () => {
  const [modalOpened, setModalOpened] = useState(false)
  const [selectedService, setSelectedService] = useState<TService | null>(null)

  const handleAddService = () => {
    setSelectedService(null)
    setModalOpened(true)
  }

  const handleEditService = (service: TService) => {
    setSelectedService(service)
    setModalOpened(true)
  }

  const handleCloseModal = () => {
    setModalOpened(false)
    setSelectedService(null)
  }

  return (
    <Container size="xl" px="md">
      <Text size="xl" fw={700} mb="md">Services Management Page</Text>
      <ServiceTable
        onEdit={handleEditService}
        onAdd={handleAddService}
      />

      <ServiceModal
        opened={modalOpened}
        onClose={handleCloseModal}
        service={selectedService}
      />
    </Container>
  )
}

export default Service