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
import { IoIosLogIn } from "react-icons/io";
import LoginUserForm from '../forms/LoginUserForm';
import { useState, useEffect } from 'react';
import { submitForm } from '../AccountMenu/AccountMenu';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts, setIsLoadingPosts, setActiveQueryFilters } from '../../redux/features/appSlice';
import { useLazyGetPostsQuery } from '../../redux/services/flixtubeCore';


function logOutUser(){
  localStorage.removeItem("token")
  localStorage.removeItem("userID")
  alert("You have been logged out!")
  store.dispatch(setLoggedIn(false))
  window.location.reload()
}

const SideBar = () => {
  const queryFilters = useSelector((state)=>state.app.activeQueryFilters)
  const [loginUserFormIsOpen, setLoginUserFormIsOpen] = useState(false)
  const loggedIn = useSelector((state)=>state.app.loggedIn)
  const [sortByDate, setSortByDate] = useState(1)
  const [sortBySubscribed, setSortBySubscribed] = useState(true)
  const dispatch = useDispatch()
  const [getPosts, { data, isLoading, error }] = useLazyGetPostsQuery()

  const getPostsByDate = () => {
    setSortByDate(sortByDate ? 0 : 1)
    dispatch(setActiveQueryFilters({...queryFilters, sort_by_date: sortByDate}))
  }

  const getPostsBySubscribed = () => {
    setSortBySubscribed(sortBySubscribed ? false : true)
    dispatch(setActiveQueryFilters({...queryFilters, subscribed: sortBySubscribed}))
  }

  useEffect(()=>{
    getPosts(queryFilters)
  }, [sortByDate])

  useEffect(()=>{
    getPosts(queryFilters)
  }, [sortBySubscribed])

  useEffect(()=>{
    if (isLoading) {
      dispatch(setIsLoadingPosts(true))
    } else  {
      dispatch(setIsLoadingPosts(false))
      if (!error){
        dispatch(setPosts(data))
      }
    }

  }, [isLoading, data])


  return (
    <div className='sidebar'>
      <section>
        <NavLink to={'/'} className='nav-link' tabIndex={1}><MdHome className='sidebar-icon'/> Home</NavLink>
        <NavLink tabIndex={2} className='nav-link' onClick={getPostsByDate}><MdAutorenew className='sidebar-icon'/> {sortByDate ? 'New':'Old'}</NavLink>
        <NavLink tabIndex={3} className='nav-link' onClick={getPostsBySubscribed}><BiSolidMoviePlay className='sidebar-icon'/>Subscribed</NavLink>
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

export { SideBar, logOutUser }
