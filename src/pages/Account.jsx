import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import './account.css'
import VideoTile from '../components/Post/Post'
import CategoryNav from '../components/CategoryNav/CategoryNav'
import { useState, useEffect } from 'react'
import Loader from '../components/Loader/Loader'
import { useGetUserQuery, useGetUserPostsQuery } from '../redux/services/flixtubeCore'
import Post from '../components/Post/Post'
import { IoAdd, IoAddCircle } from 'react-icons/io5'
import { Tooltip } from '@chakra-ui/react'
import CreatePostForm from '../components/forms/CreatePostForm'
import { submitForm } from '../components/AccountMenu/AccountMenu'




const Account = () => {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)
  const [userPosts, setUserPosts] = useState(null)
  const [createPostFormIsOpen, setCreatePostFormIsOpen] = useState(false)

  const userID = localStorage.getItem('userID')
  if (!userID){
    window.location.href = '/'
  }
  const getUserQuery = useGetUserQuery({userID: userID})
  const getUserPostsQuery = useGetUserPostsQuery({userID: userID})

  useEffect(()=>{
    if (!getUserPostsQuery.isFetching && !getUserQuery.isFetching){
      setUser(getUserQuery.data)
      setUserPosts(getUserPostsQuery.data)
      setReady(true)
    }

  }, [getUserPostsQuery.data, getUserQuery.data])
  
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
              <IoAddCircle className='add-post-btn' onClick={() => setCreatePostFormIsOpen(true)}/>
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
            <div className="flex-col">
              <CategoryNav categories={['Latest', 'Popular', 'Oldest']}/>
              <div className='content-listing'>
                {userPosts.map((post, i)=>{
                  return  <Post postData={post} key={i} viewedByOwner={true}/>
                })}
              </div>
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