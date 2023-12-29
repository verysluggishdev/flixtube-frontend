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

const DeletePostForm = ({isOpen, onClose, onSubmit, postID}) => {
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
          <h3 className='modal-header'>Delete This Post</h3>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form id='delete-post-form'>
              Are you sure you want to delete this post?
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={() => {onSubmit(`http://localhost:8000/posts/${postID}`, 'delete-post-form', 'Post was successfully deleted', 'Failed to delete post', 'DELETE'); onClose(); window.location.reload()}}>
              Delete Post
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeletePostForm