import { useState } from 'react'
import { Container, Text } from '@mantine/core'
import DepartamentTable from './ui/departament-table'
import DepartamentModal from './ui/departament-modal'
import { type TDepartament } from '../../config/querys/departament-query'

const Departament = () => {
  const [modalOpened, setModalOpened] = useState(false)
  const [selectedDepartament, setSelectedDepartament] = useState<TDepartament | null>(null)

  const handleAddDepartament = () => {
    setSelectedDepartament(null)
    setModalOpened(true)
  }

  const handleEditDepartament = (departament: TDepartament) => {
    setSelectedDepartament(departament)
    setModalOpened(true)
  }

  const handleCloseModal = () => {
    setModalOpened(false)
    setSelectedDepartament(null)
  }

  return (
    <Container size="xl" px="md">
      <Text size="xl" fw={700} mb="md">Departaments Management Page</Text>
      <DepartamentTable
        onEdit={handleEditDepartament}
        onAdd={handleAddDepartament}
      />

      <DepartamentModal
        opened={modalOpened}
        onClose={handleCloseModal}
        departament={selectedDepartament}
      />
    </Container>
  )
}

export default Departament