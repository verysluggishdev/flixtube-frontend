import { useRef } from 'react'
import './forms.css'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl, 
    FormLabel,
    Input,
    Button

  } from '@chakra-ui/react'

const CreateAccountForm = ({isOpen, onClose}) => {
    const initialRef = useRef(null)
  const finalRef = useRef(null)
  return (
    <>
        <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <h3 className='modal-header'>Create your account</h3>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <form action="" className="data-form">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="" />
                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" name="confirm-password" id="" />
                <label htmlFor="channelName">Channel Name</label>
                <input type="text" name="channelName" id="" />
                <label htmlFor="channelID">Channel ID</label>
                <input type="text" name="channelID" id="" />
                <label htmlFor="avatar">Avatar</label>
                <input type="file" name="avatar" id="" className='avatar-form-input'/>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateAccountForm