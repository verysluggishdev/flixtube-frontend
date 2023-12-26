import { useSelector, useDispatch } from 'react-redux';
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useState } from 'react';
import React from 'react'
import { VscAccount } from "react-icons/vsc";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,

  } from '@chakra-ui/react'
import './accountMenu.css'
import { IoIosLogIn } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { setLoggedIn } from '../../redux/features/appSlice';
import CreateAccountForm from '../forms/CreateAccountForm';
import LoginUserForm from '../forms/LoginUserForm';
import {store} from '../../redux/store'


const submitForm = (url, formId, messageOnSuccess, messageOnFailure) => {
  const form = document.getElementById(formId);
    const formData = new FormData(form);

    // Use fetch to send an asynchronous request with FormData
    fetch(url, {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      alert(messageOnSuccess)
      return response.json();
    })
    .then(data => {
      // Assuming data is the object with access_token and token_type properties
      if (data.access_token){
        localStorage.setItem('token', data.access_token)
        store.dispatch(setLoggedIn(true))
      }
  
    })
    .catch(error => {
      console.error('Error:', error);
      alert(messageOnFailure)
    });
  }

const AccountMenu = () => {
  const dispatch = useDispatch();
  const [createUserFormIsOpen, setCreateUserFormIsOpen] = useState(false)
  const [loginUserFormIsOpen, setLoginUserFormIsOpen] = useState(false)
  const { loggedIn } = useSelector((state) => state.app);

  
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
            <MenuItem className='menu-item' onClick={()=>setCreateUserFormIsOpen(true)}><HiOutlinePencilAlt/> Sign Up</MenuItem>
            <MenuItem className='menu-item' onClick={()=>setLoginUserFormIsOpen(true)}><IoIosLogIn/> Login</MenuItem>
            <NavLink to='/account'><MenuItem className='menu-item'><MdAccountCircle/> Your Account</MenuItem></NavLink>
        </MenuList>

    <CreateAccountForm
        isOpen={createUserFormIsOpen}
        onClose={()=>setCreateUserFormIsOpen(false)}
        onSubmit={submitForm}
    />

    <LoginUserForm
        isOpen={loginUserFormIsOpen}
        onClose={()=>setLoginUserFormIsOpen(false)}
        onSubmit={submitForm}
    />

    </Menu>
  )
}

export default AccountMenu