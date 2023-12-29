import { useRef } from 'react'
import './forms.css'
import { logOutUser } from '../SideBar/SideBar'
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

const DeleteUserForm = ({isOpen, onClose, onSubmit}) => {
  const initialRef = useRef(null)
  const finalRef = useRef(null)
  const userID = localStorage.getItem('userID')
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
          <h3 className='modal-header'>Delete your account</h3>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form id='delete-user-form'>
              Are you sure you want to delete your account?
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={() => {onSubmit(`http://localhost:8000/users/${userID}`, 'delete-user-form', 'Account was successfully deleted', 'Failed to delete account', 'DELETE'); onClose(); logOutUser();}}>
              Delete Account
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteUserForm