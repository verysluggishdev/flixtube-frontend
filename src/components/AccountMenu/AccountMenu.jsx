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

const AccountMenu = () => {
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
            <MenuItem className='menu-item'><IoIosLogIn/> Login</MenuItem>
            <NavLink to='/account'><MenuItem className='menu-item'><MdAccountCircle/> Your Account</MenuItem></NavLink>
        </MenuList>
    </Menu>
  )
}

export default AccountMenu