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
import { subscribe } from '../redux/services/flixtubeCore'


const Account = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)
  const posts = useSelector((state)=>state.app.posts)
  const [createPostFormIsOpen, setCreatePostFormIsOpen] = useState(false)
  const queryFilters = useSelector((state)=>state.app.activeQueryFilters)
  const [subscribed, setSubscribed] = useState(false)
  const [getPosts, { data, isLoading, error }] = useLazyGetPostsQuery()
  
  function handleSubscribe(id){
    if (id) dispatch(subscribe(id))
  }

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
    if (!isLoading){
      dispatch(setPosts(data))
      setReady(true)
    }

  }, [data])

  useEffect(()=>{
    if (!getUserQuery.isFetching){
      setUser(getUserQuery.data)
      setSubscribed(getUserQuery.data.subscribed)
    }
  }, [getUserQuery.data])

  useEffect(()=>{
    if (user) setSubscribed(user.subscribed);
  }, [user])
  
  return  !ready ? <Loader/> : (
    <div className="content account-main">
      <div className='account-info'>
        <div className="channel-info">
          <img src={`http://localhost:8000/media/${user?.avatar}`} alt="" className="avatar" />
          <div className="flex-col">
            <h1 className="channel-name">{user?.channelName}</h1>
            <div className="flex-row">
            <p className="channel-id">@{user?.channelID}</p>
            <p className="channel-subscriber-count">{user?.subscriber_count} subscribers</p>
            <p className="channel-video-upload-count">{posts?.length} posts</p>
            <p className="channel-view-count">100M views</p>
            </div>
            <p className="channel-headline">You Laugh You Lose</p>
            <div className="flex-row">
            <button className={`subscribe-btn ${subscribed?'unsubscribed':''}`} onClick={()=>{handleSubscribe(user?.id); setSubscribed(!subscribed) }}>{subscribed ? 'Unsubscribe' : 'Subscribe'}</button>
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
            <p className="about">{user?.channelDescription}</p>
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