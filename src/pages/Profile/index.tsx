import { useContext } from "react"
import {useNavigate} from "react-router-dom"
import { UsersContext } from "../../store/UserContext"
import { Heading,   Avatar, Button, Card } from "@chakra-ui/react"

type Props =  {

}
export function Profile({ }: Props) {
  
  const navigate = useNavigate()
  const userCtx = useContext(UsersContext)
  const user = userCtx.user()


  return (
    <div className="homeContainer main-layout"  style={{ gap: "1rem" }}>
      <Button colorScheme="orange" size="md" onClick={() => navigate(-1)}>Back</Button>
      <Card padding="3rem" variant="filled" size="lg" display="flex" flexDir="column" gap="1rem" alignItems="center">
        <Heading size='lg'> Personal details</Heading>
            <Avatar
              size='xl'
              name=''
              src={user!.image? user!.image : 'https://bit.ly/broken-link'}
            />
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
      </Card>
    </div>
  )
}
