import Post from "../components/Post/Post"
import './discover.css'
import Loader from "../components/Loader/Loader"
import { useState, useEffect } from "react"
import { useGetPostsQuery } from "../redux/services/flixtubeCore"
import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';


const Discover = () => {

  const posts = useSelector((state)=>state.app.posts)
  const loadingPosts = useSelector((state)=>state.app.isLoadingPosts)

  useEffect(()=>{

  }, [posts])
  
  return  loadingPosts ? <Loader/> : (
    <div className='content content-listing'>
      {posts?.map((post, i)=>{
        return <Post key={i} postData={post}/>
      })}        
    </div>
  ) 
}

export default Discover