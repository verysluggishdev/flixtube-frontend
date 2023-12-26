import Post from "../components/Post/Post"
import './discover.css'
import Loader from "../components/Loader/Loader"
import { useState, useEffect } from "react"
import { useGetPostsQuery } from "../redux/services/flixtubeCore"
import { NavLink } from "react-router-dom"
import { useSelector } from 'react-redux';


const Discover = () => {
  const loggedIn = useSelector((state)=>state.app.loggedIn)
  const {data, isFetching, error} = useGetPostsQuery({variables: loggedIn})

  return  isFetching ? <Loader/> : (
    <div className='content content-listing'>
      {data?.map((item, i)=>{
        return <NavLink to={`/post/${item.post.id}`} key={i}><Post postData={item}/></NavLink>  
      })}        
    </div>
  ) 
}

export default Discover