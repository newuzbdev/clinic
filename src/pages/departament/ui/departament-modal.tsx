import { Modal } from '@mantine/core'
import DepartamentForm from './departament-form'
import { type TDepartament } from '../../../config/querys/departament-query'

interface DepartamentModalProps {
  opened: boolean
  onClose: () => void
  departament?: TDepartament | null
  title?: string
}

const DepartamentModal = ({ opened, onClose, departament, title }: DepartamentModalProps) => {
  const modalTitle = title || (departament ? 'Edit Departament' : 'Add New Departament')

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={modalTitle}
      size="md"
      centered
    >
      <DepartamentForm
        departament={departament}
        onSuccess={onClose}
        onCancel={onClose}
      />
    </Modal>
  )
}

export default DepartamentModal