import { Button, TextInput } from "@mantine/core"

const App = () => {
  return (
    <div>
      <TextInput label="Your email" placeholder="Enter email" />
      <Button color="blue" mt="md" className="!bg-red-500">Submit</Button>
    </div>
  )
}

export default App