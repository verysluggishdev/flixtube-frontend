import { useSelector, useDispatch } from 'react-redux';
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useState } from 'react';
import React from 'react'
import { VscAccount } from "react-icons/vsc";
import {Menu, MenuButton, MenuList, MenuItem, IconButton} from '@chakra-ui/react'
import './accountMenu.css'
import { IoIosLogIn } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { setLoggedIn } from '../../redux/features/appSlice';
import CreateAccountForm from '../forms/CreateAccountForm';
import LoginUserForm from '../forms/LoginUserForm';
import {store} from '../../redux/store'
import UpdateAccountForm from '../forms/UpdateAccountForm';
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import DeleteUserForm from '../forms/DeleteUserForm';
import { TiUserDelete } from "react-icons/ti";
import { IoAddCircle } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import { logOutUser } from '../SideBar/SideBar';

function removeEmptyAttributes(formData, method) {
  formData.forEach((value, key) => {
    if (key == 'video' || key == 'video'){
      if (method == 'PUT'){
        if (value.size == 0){
          formData.delete(key)
        }
      }
    }
  });
}

const submitForm = (url, formId, messageOnSuccess, messageOnFailure, method='POST') => {
  const form = document.getElementById(formId);
    const formData = new FormData(form);
    removeEmptyAttributes(formData, method)
    const token = localStorage.getItem('token')

    // Use fetch to send an asynchronous request with FormData
    fetch(url, {
      method: method,
      headers: {
        'Authorization': token ?  `Bearer ${token}`:''
      },
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      alert(messageOnSuccess)
      return response.status == 204 ? {data:"none"}: response.json();    
    
    })
    .then(data => {
      // Assuming data is the object with access_token and token_type properties
      if (data.access_token){
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('userID', data.id)
        store.dispatch(setLoggedIn(true))
        window.location.reload()
      }
  
    })
    .catch(error => {
      console.error('Error:', error);
      method == 'DELETE'?'': alert(messageOnFailure)
    });
  }

const AccountMenu = () => {
  const loggedIn = useSelector((state)=>state.app.loggedIn)
  const [createUserFormIsOpen, setCreateUserFormIsOpen] = useState(false)
  const [deleteUserFormIsOpen, setDeleteUserFormIsOpen] = useState(false)
  const [loginUserFormIsOpen, setLoginUserFormIsOpen] = useState(false)
  const [updateAccountFormIsOpen, setUpdateAccountFormIsOpen] = useState(false)
  
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
            {
              loggedIn ? (
            <>
              <MenuItem className='menu-item' onClick={()=>setUpdateAccountFormIsOpen(true)}><MdOutlineSystemUpdateAlt/> Update Profile</MenuItem>
              <MenuItem className='menu-item' onClick={()=>setDeleteUserFormIsOpen(true)}><TiUserDelete/> Delete Account</MenuItem>
              <NavLink to='/account'><MenuItem className='menu-item'><MdAccountCircle/> Your Account</MenuItem></NavLink>
              <MenuItem className='menu-item' onClick={logOutUser}><HiOutlineLogout onClick={logOutUser}/> Logout</MenuItem>
            </>
              ):(
                <>
                  <MenuItem className='menu-item' onClick={()=>setCreateUserFormIsOpen(true)}><HiOutlinePencilAlt/> Sign Up</MenuItem>
                  <MenuItem className='menu-item' onClick={()=>setLoginUserFormIsOpen(true)}><IoIosLogIn/> Login</MenuItem>
                </>
              )
            }
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

    <UpdateAccountForm
        isOpen={updateAccountFormIsOpen}
        onClose={()=>setUpdateAccountFormIsOpen(false)}
        onSubmit={submitForm}
    />

    <DeleteUserForm
      isOpen={deleteUserFormIsOpen}
      onClose={()=>setDeleteUserFormIsOpen(false)}
      onSubmit={submitForm}
    />
    </Menu>
  )
}

export {submitForm, AccountMenu};
