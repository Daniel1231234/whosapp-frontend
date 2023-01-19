import { useContext, useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import { UsersContext } from "../../store/UserContext"
import { Heading,   Avatar, Button, Card, Box, ButtonGroup, Divider } from "@chakra-ui/react"
import { EditField } from "./EditField"
import { AuthContext } from "../../store/AuthContext"
import { useToastMsg } from "../../cmps/UI/Toast/useToastMsg"
import { toastContent } from "../../cmps/UI/Toast/toastContent"


export function UserProfile() {
    const { loggedinUser } = useContext(AuthContext)
    const {updateUserInDB} = useContext(UsersContext)
    const [name, setName] = useState(loggedinUser().name)
    const [email, setEmail] = useState(loggedinUser().email)
    const [image, setImage] = useState(loggedinUser().image)
    const toastSuccess = useToastMsg(toastContent.success)
    const toastErr = useToastMsg(toastContent.error)
    const navigate = useNavigate()

    const onNameChange = (val: any) => {
        setName(val)
    }
    
    const onEmailChange = (val:any) => {
        console.log(val)
        setEmail(val)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await updateUserInDB(name, email)
            toastSuccess.showToast()
            // navigate('/home')
        } catch (err) {
            console.log(err)
            toastErr.showToast()
        }
    }



    return (
      <div className="homeContainer main-layout" style={{ gap: "1rem" }}>
      <Card padding="3rem" variant="filled" size="lg" display="flex" flexDir="column" gap="1rem" alignItems="center">
        <Heading size='lg'> Edit Profile</Heading>
            <Avatar
              size='xl'
              name=''
              src={loggedinUser().image? URL.createObjectURL(image)  : ''}
                />
          <Box display="flex" flexDir="column" justifyContent="flex-start">
            <EditField val={name} onChange={onNameChange} label={'Full Name:'} />
                    <EditField val={email} onChange={onEmailChange} label={"Email:"} />
            <ButtonGroup display="flex" gap="10px"   mt="1rem">
                <Button colorScheme="green" size="md" onClick={handleSubmit}>Submit changes</Button>
                <Button colorScheme="red" size="md" onClick={() => navigate(-1)}>Back</Button>
            </ButtonGroup>
          </Box>
        </Card>
        </div>
  )
}