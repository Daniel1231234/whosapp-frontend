// import "./header.css"
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Box, Button, ButtonGroup, Flex, Heading, Spacer, useColorMode } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../store/AuthContext'
import { toastContent } from '../UI/Toast/toastContent'
import { useToastMsg } from '../UI/Toast/useToastMsg';


export const AppHeader = ({ handleLogout }: { handleLogout: any }) => {
  const navigate = useNavigate()
  const { loggedinUser } = useContext(AuthContext)
  const toastSuccess = useToastMsg(toastContent.logoutSuccess)
  const toastErr = useToastMsg(toastContent.logoutErr)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { colorMode, toggleColorMode } = useColorMode()
  const userLoggedin = loggedinUser()

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const onLogout = () => {
    try {
      handleLogout()
      toastSuccess.showToast()
    } catch (err) {
      console.log(err)
      toastErr.showToast()
    }
  }


  return (
    <Flex minWidth='max-content' alignItems='center' gap='2' p="4" bg="blackAlpha.800">
      {userLoggedin && (
        <ButtonGroup gap='2'>
          <Button size={screenWidth < 400 ? 'sm' : "md"} onClick={onLogout} colorScheme='teal' variant="link">Sign Out</Button>
          <Button size={screenWidth < 400 ? 'sm' : "md"} onClick={() => navigate(`/profile`)} colorScheme='teal'>Profile</Button>
        </ButtonGroup>
      )}
      <Spacer />
      <Button
        colorScheme={colorMode === 'light' ? "whiteAlpha" : 'inherit'}
        variant="ghost"
        size={screenWidth < 400 ? 'sm' : "md"}
        onClick={toggleColorMode} >{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}</Button>
      <Box p="2">
        <Heading onClick={() => navigate('/home')} style={{ fontFamily: 'Edu QLD Beginner, cursive', cursor: 'pointer' }} size="xl" color="white">WhosApp</Heading>
      </Box>
    </Flex>
  )
}
