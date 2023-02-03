import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react"
import { CopyLink } from "../../cmps/UI/CopyLink"
import { Chat } from "../../models/Chat"

type Props = {
    isOpen:any,
    onClose:any,
    currRoom:Chat

}

export const InviteModal = ({isOpen, onClose, currRoom}:Props) => {
      const invitationLink = import.meta.env.MODE === 'development' ? `${window.location.origin}/join/${currRoom?._id}` : `https://whosapp.onrender.com/join/${currRoom?._id}`
  // let invitationLink = `${window.location.origin}/join/${currRoom?._id}`

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Send invitaion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <CopyLink link={invitationLink} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}