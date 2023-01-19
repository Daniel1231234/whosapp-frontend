import { useDisclosure, Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
import React from "react"

type Props = {
    onAction?: any
    title?: string
    body?: string
    modalIsOpen?: any
    closeModal?: any
    actionBtnTitle?:string
}

function CustomModal(props:Props) {
  const finalRef = React.useRef(null)
    
  return (
    <>
      <Modal finalFocusRef={finalRef} isOpen={props.modalIsOpen} onClose={props.closeModal}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>{props.title }</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {props.body}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={props.closeModal}>
              Close
            </Button>
             <Button colorScheme={props.actionBtnTitle === 'Delete' ? 'red' : 'whatsapp'} onClick={props.onAction}>{props.actionBtnTitle }</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CustomModal