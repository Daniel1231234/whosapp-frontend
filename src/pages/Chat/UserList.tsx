import { Box } from "@chakra-ui/react"
import { User } from "../../models/User"

type Props = {
  roomUsers: User[] | []
}
export const UserList = ({ roomUsers }: Props) => {

  return (
    <>
      <Box color='rgb(153, 217, 234)' textAlign="center" fontSize="1rem" as="p">{roomUsers?.length} Active user </Box>
    </>
  )
}