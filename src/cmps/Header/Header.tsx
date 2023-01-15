import { Box, Button, ButtonGroup, Flex, Heading, Spacer } from '@chakra-ui/react'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../store/AuthContext'
import { UsersContext } from '../../store/UserContext'
import { toastContent } from '../UI/Toast/toastContent'
import { useToastMsg } from '../UI/Toast/useToastMsg';




export const AppHeader = () => {
    const navigate = useNavigate()
  const {  user } = useContext(UsersContext)
   const toastSuccess = useToastMsg(toastContent.logoutSuccess)
   const toastErr = useToastMsg(toastContent.logoutErr)
  const {logout} = useContext(AuthContext)

  const userLoggedin = user()
 
  
    const onLogout =  async () => {
      try {
        logout()
        toastSuccess.showToast()
      } catch (err) {
        console.log(err)
        toastErr.showToast()
      }
  }

  const goProfile = () => {
    navigate(`/user/${userLoggedin._id}`)
  }

  return (
    <Flex minWidth='max-content' alignItems='center' gap='2' p="4" bg="black">
        {userLoggedin && (
          <ButtonGroup gap='2'>
          <Button size="md" onClick={onLogout} colorScheme='teal' variant="link">Sign Out</Button>
          <Button  size="md" onClick={goProfile} colorScheme='teal'>Profile</Button>
        </ButtonGroup>
        )}
        <Spacer />
      <Box p="2">
        <Heading onClick={() => navigate('/')} style={{ fontFamily: 'Edu QLD Beginner, cursive', cursor:'pointer'}} size="xl" color="white">WhosApp</Heading>
      </Box>
    </Flex>
  )
}
