import { Box, Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { UserProfile } from "./UserProfile"


export function Profile() {
  const navigate = useNavigate()

  return (
    <div className="homeContainer main-layout" style={{ gap: "1rem" }}>
        <Button colorScheme="orange" size="md" onClick={() => navigate(-1)}>Back</Button>
       <UserProfile /> 
    </div>
  )
}
