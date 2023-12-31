import Post from "../components/Post/Post"
import Loader from "../components/Loader/Loader"
import { useEffect } from "react"
import { useSelector} from 'react-redux';
import './discover.css'

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