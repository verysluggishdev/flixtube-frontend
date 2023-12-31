import Post from "../components/Post/Post"
import './discover.css'
import Loader from "../components/Loader/Loader"
import { useState, useEffect } from "react"
import { useGetPostsQuery } from "../redux/services/flixtubeCore"
import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from "../redux/features/appSlice"


const Discover = () => {

  const posts = useSelector((state)=>state.app.posts)

  useEffect(()=>{

  }, [posts])
  
  return  false ? <Loader/> : (
    <div className='content content-listing'>
      {posts?.map((post, i)=>{
        return <Post key={i} postData={post}/>
      })}        
    </div>
  ) 
}

export default Discover