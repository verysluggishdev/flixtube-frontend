import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import './account.css'
import { useState, useEffect } from 'react'
import Loader from '../components/Loader/Loader'
import { useGetUserQuery, useLazyGetPostsQuery } from '../redux/services/flixtubeCore'
import Post from '../components/Post/Post'
import { IoAddCircle } from 'react-icons/io5'
import CreatePostForm from '../components/forms/CreatePostForm'
import { submitForm } from '../components/AccountMenu/AccountMenu'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts, setActiveQueryFilters } from '../redux/features/appSlice'
import { Tooltip } from '@chakra-ui/react'


const Account = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)
  const posts = useSelector((state)=>state.app.posts)
  const [createPostFormIsOpen, setCreatePostFormIsOpen] = useState(false)
  const queryFilters = useSelector((state)=>state.app.activeQueryFilters)
  const [getPosts, { data, isLoading, error }] = useLazyGetPostsQuery()

  const userID = localStorage.getItem('userID')
  if (!userID){
    window.location.href = '/'
  }
  const getUserQuery = useGetUserQuery({userID: userID})

  useEffect(()=>{
    dispatch(setActiveQueryFilters({...queryFilters, owner_id: userID}))
    return ()=>{
      dispatch(setActiveQueryFilters({...queryFilters, owner_id: null}))
    }
  }, [])

  useEffect(()=>{
    if (queryFilters)getPosts(queryFilters)
  }, [queryFilters])

  useEffect(()=>{
    if (!isLoading && !getUserQuery.isFetching){
      setUser(getUserQuery.data)
      dispatch(setPosts(data))
      console.log(data)
      setReady(true)
    }

  }, [data, getUserQuery.data])
  
  return  !ready ? <Loader/> : (
    <div className="content account-main">
      <div className='account-info'>
        <div className="channel-info">
          <img src={`http://localhost:8000/media/${user?.avatar}`} alt="" className="avatar" />
          <div className="flex-col">
            <h1 className="channel-name">{user?.channelName}</h1>
            <div className="flex-row">
            <p className="channel-id">@{user?.channelID}</p>
            <p className="channel-subscriber-count">8.9M subscribers</p>
            <p className="channel-video-upload-count">1.5k videos</p>
            <p className="channel-view-count">100M views</p>
            </div>
            <p className="channel-headline">You Laugh You Lose</p>
            <div className="flex-row">
              <button className="subscribe-btn">Subscribe</button>
              <Tooltip label='New Post' fontSize='md'>
                <span><IoAddCircle className='add-post-btn' onClick={() => setCreatePostFormIsOpen(true)}/></span>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <div className="account-media">
      <Tabs variant='enclosed'>
        <TabList>
          <Tab>Videos</Tab>
          <Tab>About</Tab>
        </TabList>
        <TabPanels>
          <TabPanel className='panel'>  
              <div className='content-listing'>
                {posts?.map((post, i)=>{
                  return  <Post postData={post} key={i} viewedByOwner={true}/>
                })}
              </div>
          </TabPanel>
          <TabPanel>
            <p className="about">Welcome to BruhMan, the ultimate meme destination where laughter knows no bounds! 🤣 Brace yourself for a rollercoaster of hilarity as we curate the dankest and most relatable memes that'll have you saying 'bruh' in every language. From side-splitting humor to mind-bending absurdity, BruhMan is your go-to spot for daily doses of laughter and a guaranteed escape from the ordinary. Get ready to embark on a meme-filled journey where every post is a bruh moment waiting to happen! 😂 </p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      </div>
      <CreatePostForm
        isOpen={createPostFormIsOpen}
        onClose={()=>setCreatePostFormIsOpen(false)}
        onSubmit={submitForm}
      />
    </div>
  )
}

export default Account