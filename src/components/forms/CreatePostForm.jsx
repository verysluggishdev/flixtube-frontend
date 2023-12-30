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

const CreatePostForm = ({isOpen, onClose, onSubmit}) => {
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
          <h3 className='modal-header'>Create a post</h3>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <form action="" className="data-form" id='create-post-form'>
                <label htmlFor="title">Title</label>
                <input type="text" name="title"/>
                <label htmlFor="description">Description</label>
                <input type="text" name="description"/>
                <label htmlFor="category">Category</label>
                <input type="text" name="category"/>
                <label htmlFor="video">Video</label>
                <input type="file" name="video" className='avatar-form-input'/>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => {onSubmit('http://localhost:8000/posts', 'create-post-form', 'Post was successfully created', 'Failed to create post'); onClose()}}>
              Create Post
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePostForm