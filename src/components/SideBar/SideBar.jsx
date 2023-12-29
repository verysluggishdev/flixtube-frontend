import './sidebar.css';
import { MdHome } from "react-icons/md";
import { MdAutorenew } from "react-icons/md";
import { BiSolidMoviePlay } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
import { MdWatchLater } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { HiOutlineLogout } from "react-icons/hi";
import {store} from '../../redux/store'
import { setLoggedIn } from '../../redux/features/appSlice';
import { useSelector } from 'react-redux';
import { IoIosLogIn } from "react-icons/io";
import LoginUserForm from '../forms/LoginUserForm';
import { useState } from 'react';
import { submitForm } from '../AccountMenu/AccountMenu';

function logOutUser(){
  localStorage.removeItem("token")
  localStorage.removeItem("userID")
  alert("You have been logged out!")
  store.dispatch(setLoggedIn(false))
  window.location.reload()
}

const SideBar = () => {
  const [loginUserFormIsOpen, setLoginUserFormIsOpen] = useState(false)
  const loggedIn = useSelector((state)=>state.app.loggedIn)
  return (
    <div className='sidebar'>
      <section>
        <NavLink to={'/'} className='nav-link' tabIndex={1}><MdHome className='sidebar-icon'/> Home</NavLink>
        <NavLink tabIndex={2} className='nav-link'><MdAutorenew className='sidebar-icon'/> New</NavLink>
        <NavLink tabIndex={3} className='nav-link'><BiSolidMoviePlay className='sidebar-icon'/> Subscriptions</NavLink>
        <hr />
      </section>
      <section>
        <NavLink tabIndex={4} className='nav-link'><MdWatchLater className='sidebar-icon'/>Watch Later</NavLink>
        <NavLink tabIndex={5} className='nav-link'><FaHistory className='sidebar-icon'/>History</NavLink>
        <NavLink tabIndex={6} className='nav-link'><AiFillLike className='sidebar-icon'/>Liked Videos</NavLink>
        <hr />
      </section>
      <section>
        <h1>Explore</h1>
        <NavLink tabIndex={7} className='nav-link'>Python</NavLink>
        <NavLink tabIndex={8} className='nav-link'>Cristiano Ronaldo</NavLink>
        <NavLink tabIndex={9} className='nav-link'>Fortnite</NavLink>
        <NavLink tabIndex={10} className='nav-link'>Ninja</NavLink>
        <hr />
      </section>
      <section>
        {
          loggedIn ? (
            <NavLink tabIndex={11} className='nav-link' onClick={logOutUser}>
              <HiOutlineLogout className='sidebar-icon'/>Logout
            </NavLink>
          ) : (
            <NavLink tabIndex={11} className='nav-link' onClick={()=>setLoginUserFormIsOpen(true)}>
              <IoIosLogIn className='sidebar-icon'/>Login 
            </NavLink>
          )
        }
      </section>
      <section>
        <div className="content-faker"></div>
      </section>

    <LoginUserForm
        isOpen={loginUserFormIsOpen}
        onClose={()=>setLoginUserFormIsOpen(false)}
        onSubmit={submitForm}
    />
    </div>
  )
}

export default SideBar
