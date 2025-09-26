import { Container, Text, Button, Table, Title } from '@mantine/core'

const UsersSimple = () => {
  console.log('UsersSimple component rendering...')
  
  return (
    <Container size="xl" px="" mt="2xl">
      <Title order={1} mb="md">Users Management Page - Simple Version</Title>
      
      <Button mb="md">Add User</Button>
      
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Username</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th>Role</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>John Smith</Table.Td>
            <Table.Td>johnsmith</Table.Td>
            <Table.Td>+1-555-0123</Table.Td>
            <Table.Td>Admin</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>Dr. Sarah Johnson</Table.Td>
            <Table.Td>sarahjohnson</Table.Td>
            <Table.Td>+1-555-0124</Table.Td>
            <Table.Td>Doctor</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Container>
  )
}

export default UsersSimple