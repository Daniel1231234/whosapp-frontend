import { Socket } from "socket.io-client"
import { MessageModel } from '../../models/Message'
import { useToastMsg } from "../../cmps/UI/Toast/useToastMsg"
import { Box, Button } from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"

type Props = {
  socket: Socket<any>
  msgRecived: any
  setMsgRecived: any
  username: string
  msg: MessageModel

}
export const Message = (props: Props) => {
  const removeErr = useToastMsg({ title: 'Can not remove this messgae!', status: 'error' })


  const removeMsg = async () => {
    if (props.msg.sender === 'ChatBot') {
      removeErr.showToast()
      return
    }

    if (props.msg.sender !== props.username) {
      removeErr.showToast()
      return
    }

    const updatedMsgs = props.msgRecived.filter((msg: MessageModel) => msg._id !== props.msg._id)
    props.setMsgRecived(updatedMsgs)
    props.socket.emit('remove_message', props.msg)
  }


  return (
    <Box
      bg='gray.700'
      boxShadow="rgb(0 0 0 / 40%) 0px 2px 4px, rgb(0 0 0 / 30%) 0px 7px 13px -3px, rgb(0 0 0 / 20%) 0px -3px 0px inset"
      mb="24px"
      p="14px"
      _first={{ marginTop: '1rem' }} >
      <Box
        display="flex"
        justifyContent="space-between"
      >
        <Box as="span" color="rgb(153, 217, 234)" fontSize="0.9rem" >{props.msg.sender}</Box>
        <Box as="span" color="rgb(153, 217, 234)" fontSize="0.9rem">{formatDate(props.msg.createdAt)}</Box>
        <Button colorScheme="red.600" onClick={removeMsg}><DeleteIcon color="white" cursor="pointer" /></Button>
      </Box>
      <p className="msgText">{props.msg.txt}</p>
    </Box>
  )
}

function formatDate(timestamp: string | number | Date) {
  const date = new Date(+timestamp);
  return date.toLocaleString();
}