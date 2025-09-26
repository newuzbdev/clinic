import { Modal } from '@mantine/core'
import ServiceForm from './service-form'
import { type TService } from '../../../config/querys/service-query'

interface ServiceModalProps {
  opened: boolean
  onClose: () => void
  service?: TService | null
  title?: string
}

const ServiceModal = ({ opened, onClose, service, title }: ServiceModalProps) => {
  const modalTitle = title || (service ? 'Edit Service' : 'Add New Service')

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={modalTitle}
      size="md"
      centered
    >
      <ServiceForm
        service={service}
        onSuccess={onClose}
        onCancel={onClose}
      />
    </Modal>
  )
}

export default ServiceModal