import { useRef } from 'react'
import './forms.css'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button

  } from '@chakra-ui/react'

const LoginUserForm = ({isOpen, onClose, onSubmit}) => {
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
          <form action="" className="data-form" id='login-form'>
                <label htmlFor="email">Email</label>
                <input type="email" name="email"/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password"/>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => {onSubmit('http://localhost:8000/login', 'login-form', 'Login was successfull!', 'Login failed. Invalid credentials!'); onClose()}}>
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