import { Box, Button, ButtonGroup, Flex, Heading, Spacer } from '@chakra-ui/react'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../store/AuthContext'
import { toastContent } from '../UI/Toast/toastContent'
import { useToastMsg } from '../UI/Toast/useToastMsg';




export const AppHeader = ({handleLogout}:{handleLogout:any}) => {
    const navigate = useNavigate()
  const {loggedinUser} =  useContext(AuthContext)
   const toastSuccess = useToastMsg(toastContent.logoutSuccess)
   const toastErr = useToastMsg(toastContent.logoutErr)

  const userLoggedin = loggedinUser()
 
  
    const onLogout =   () => {
      try {
        handleLogout()
        toastSuccess.showToast()
      } catch (err) {
        console.log(err)
        toastErr.showToast()
      }
  }


  return (
    <Flex minWidth='max-content' alignItems='center' gap='2' p="4" bg="black">
        {userLoggedin && (
          <ButtonGroup gap='2'>
          <Button size="md" onClick={onLogout} colorScheme='teal' variant="link">Sign Out</Button>
          <Button  size="md" onClick={() => navigate(`/profile`)} colorScheme='teal'>Profile</Button>
        </ButtonGroup>
        )}
        <Spacer />
      <Box p="2">
        <Heading onClick={() => navigate('/home')} style={{ fontFamily: 'Edu QLD Beginner, cursive', cursor:'pointer'}} size="xl" color="white">WhosApp</Heading>
      </Box>
    </Flex>
  )
}
