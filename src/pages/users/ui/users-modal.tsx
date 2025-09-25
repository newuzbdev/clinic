import { Modal } from '@mantine/core'
import UsersForm from './users-form'
import { type TUser } from '../../../config/querys/users-query'

interface UsersModalProps {
  opened: boolean
  onClose: () => void
  user?: TUser | null
  title?: string
}

const UsersModal = ({ opened, onClose, user, title }: UsersModalProps) => {
  const modalTitle = title || (user ? 'Edit User' : 'Add New User')

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={modalTitle}
      size="md"
      centered
    >
      <UsersForm
        user={user}
        onSuccess={onClose}
        onCancel={onClose}
      />
    </Modal>
  )
}

export default UsersModal