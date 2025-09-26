import { useState } from 'react'
import { Container, Text, Title } from '@mantine/core'
import UsersTable from './ui/users-table'
import UsersModal from './ui/users-modal'
import { type TUser } from '../../config/querys/users-query'

const Users = () => {
  const [modalOpened, setModalOpened] = useState(false)
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null)

  const handleAddUser = () => {
    setSelectedUser(null)
    setModalOpened(true)
  }

  const handleEditUser = (user: TUser) => {
    setSelectedUser(user)
    setModalOpened(true)
  }

  const handleCloseModal = () => {
    setModalOpened(false)
    setSelectedUser(null)
  }


  return (
    <Container size="xl" px="" mt="2xl">
      <Title order={1} mb="md">Users Management Page</Title>
      <UsersTable
        onEdit={handleEditUser}
        onAdd={handleAddUser}
      />

      <UsersModal
        opened={modalOpened}
        onClose={handleCloseModal}
        user={selectedUser}
      />
    </Container>
  )
}

export default Users