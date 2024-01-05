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

const CreateAccountForm = ({isOpen, onClose, onSubmit}) => {
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
  
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'
      />
  
        <ModalContent>
          <h3 className='modal-header'>Create your account</h3>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <form action="" className="data-form" id='create-user-form'>
                <label htmlFor="email">Email</label>
                <input type="email" name="email"/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password"/>
                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" name="confirm-password"/>
                <label htmlFor="channelName">Channel Name</label>
                <input type="text" name="channelName"/>
                <label htmlFor="channelID">Channel ID</label>
                <input type="text" name="channelID"/>
                <label htmlFor="channelDescription">Channel Description</label>
                <textarea name="channelDescription" id="" cols="30" rows="3"></textarea>
                <label htmlFor="avatar">Avatar</label>
                <input type="file" name="avatar" className='avatar-form-input'/>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => {onSubmit('http://localhost:8000/users', 'create-user-form', 'Account was successfully created', 'Failed to create account'); onClose()}}>
              Create Account
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateAccountForm