import { useState } from 'react'
import { Container, Title } from '@mantine/core'
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
    <Container size="xl" px="" mt="2xl">
      <Title order={1} mb="md">Departaments Management Page</Title>
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