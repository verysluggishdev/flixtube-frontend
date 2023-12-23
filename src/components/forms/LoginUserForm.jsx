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

const LoginUserForm = ({isOpen, onClose}) => {
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
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Login
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LoginUserForm