import { useContext, useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import { UsersContext } from "../../store/UserContext"
import { Heading,   Avatar, Button, Card, Box } from "@chakra-ui/react"
import { EditblleCh } from "./EditblleCh"

type Props =  {

}
export function UserProfile(props: Props) {
    const userCtx = useContext(UsersContext)
    const user = userCtx.user()
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [image, setImage] = useState(user.image)

    const onNameChange = (val:any) => {
        // console.log(val);
        setName(val)
    }

    const onEmailChange = (val:any) => {
        setEmail(val)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        userCtx.updateUser(name, email)
    }

  return (
      <Card padding="3rem" variant="filled" size="lg" display="flex" flexDir="column" gap="1rem" alignItems="center">
        <Heading size='lg'> Personal details</Heading>
            <Avatar
              size='xl'
              name=''
              src={user!.image? image : 'https://bit.ly/broken-link'}
          />
          <Box display="flex" flexDir="column" justifyContent="flex-start">
            <EditblleCh val={name} onChange={onNameChange} label={'Full Name:'} />
              <EditblleCh val={email} onChange={onEmailChange} label={"Email:"} />
              <Button colorScheme="green" size="md" onClick={handleSubmit}>Submit changes</Button>
          </Box>
      </Card>
  )
}