import Post from "../components/Post/Post"
import './discover.css'
import Loader from "../components/Loader/Loader"
import { useState, useEffect } from "react"
import { useGetPostsQuery } from "../redux/services/flixtubeCore"


const Discover = () => {
  const {data, isFetching, error} = useGetPostsQuery()

  return  isFetching ? <Loader/> : (
    <div className='content content-listing'>
      {data?.map((item, i)=>{
        return <Post postData={item} key={i}/>  
      })}        
    </div>
  ) 
}

export default Discover