import { useSelector, useDispatch } from 'react-redux';
import { HiOutlinePencilAlt } from "react-icons/hi";
import React from 'react'
import { VscAccount } from "react-icons/vsc";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    useDisclosure,

  } from '@chakra-ui/react'
import './accountMenu.css'
import { IoIosLogIn } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { setLoggedIn } from '../../redux/features/appSlice';
import CreateAccountForm from '../forms/CreateAccountForm';


const AccountMenu = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.app);
  const { isOpen, onOpen, onClose } = useDisclosure()

  

  
//   console.log(loggedIn)
//   useEffect(() => {dispatch(setLoggedIn(true))})
//   console.log(loggedIn)
  
  return (
    <Menu>
        <MenuButton
            className='menu-btn'
            as={IconButton}
            aria-label='Options'
            icon={<VscAccount />}
            variant='outline'
        />
        <MenuList className='account-menu'>
            <MenuItem className='menu-item' onClick={onOpen}><HiOutlinePencilAlt/> Sign Up</MenuItem>
            <MenuItem className='menu-item' onClick={onOpen}><IoIosLogIn/> Login</MenuItem>
            <NavLink to='/account'><MenuItem className='menu-item'><MdAccountCircle/> Your Account</MenuItem></NavLink>
        </MenuList>

    <CreateAccountForm
        isOpen={isOpen}
        onClose={onClose}
    />

    </Menu>
  )
}

export default AccountMenu