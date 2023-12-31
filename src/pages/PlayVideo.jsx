import ReactPlayer from 'react-player'
import './playVideo.css'
import { useGetPostQuery } from '../redux/services/flixtubeCore'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader/Loader'
import { IoMdThumbsUp, IoMdThumbsDown, IoMdShareAlt } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import React, { useState, useEffect } from 'react';
import { subscribe } from '../redux/services/flixtubeCore'
import { useDispatch } from 'react-redux';


const PlayVideo = () => {
  const { postID } = useParams();
  const {data, isFetching, error} = useGetPostQuery({postID: postID})

  const [liked, setLiked] = useState(false)
  const [disliked, setDisLiked] = useState(false)
  const [shared, setShared] = useState(false)
  const [likeCount, setLikedCount] = useState(0)
  const [dislikeCount, setDisLikeCount] = useState(0)
  const [shareCount, setShareCount] = useState(0)
  const [subscribed, setSubscribed] = useState(false)
  const dispatch = useDispatch()

  function handleSubscribe(id){
    dispatch(subscribe(id))
  }

  useEffect(() => {
    // Update state based on the fetched data when it's available
    if (!isFetching && data) {
      setLikedCount(data.likes);
      setDisLikeCount(data.dislikes);
      setShareCount(data.shares);
      setLiked(data.liked);
      setDisLiked(data.disliked);
      setShared(data.shared);
      setSubscribed(data.subscribed)
    }
  }, [data, isFetching])
  
  function handleMetricClick(action){
    if (action === 'liked'){
      setLiked(!liked)
      if (disliked) setDisLiked(false)
    }

    if (action === 'disliked'){
      setDisLiked(!disliked)
      if (liked) setLiked(false)
    }

    if (action === 'shared'){
      setShared(true)
    }
    const apiUrl = `http://localhost:8000/posts/${postID}`;
    
    var postData = {liked: liked, disliked:disliked, shared:shared};
    if (action == 'liked'){
      if (!liked){
        postData.liked = true
        setLikedCount(likeCount+1)
        if (disliked){
          postData.disliked = false
          setDisLikeCount(dislikeCount-1)
        } 

      } else {
        postData.liked = false
        setLikedCount(likeCount-1)
      }
      
    }
    if (action == 'disliked'){
      if (!disliked){
        postData.disliked = true
        setDisLikeCount(dislikeCount+1)
        if (liked) {
          postData.liked = false
          setLikedCount(likeCount-1)
        }
      } else {
        postData.disliked = false
        setDisLikeCount(dislikeCount-1)
      }
    }
    if (action == 'shared'){
      postData.shared = true
      
    }


    
   
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':  `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(postData),
  };

  fetch(apiUrl, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  return isFetching  ? <Loader/> :(
    <div className="play-video-page content">
      <div className="video">
        <ReactPlayer 
          url={`http://localhost:8000/media/${data?.video}`}
          playing={true}
          controls={true}
          width={'100%'}
          height={'100%'}
        />
      </div>
      <h1 className="post-title">{data?.title}</h1>
      <div className="container">
        <div className="flex-row post-creator-info">
          <img src={`http://localhost:8000/media/${data?.owner.avatar}`} alt="" className="avatar" />
          <div className="flex-col">
            <p className="channelID">@{data?.owner.channelID}</p>
            <button className={`subscribe-btn ${subscribed?'unsubscribed':''}`} onClick={()=>{handleSubscribe(data.owner.id); setSubscribed(!subscribed) }}>{subscribed ? 'Unsubscribe' : 'subscribe'}</button>
          </div>
        </div>
        <div className="metric-buttons flex-row">
          <div className="metric-container">
            <IoMdThumbsUp className={`metric-btn ${liked ? 'liked':''}`} onClick={()=>handleMetricClick('liked')}/>
            <div className="metric-count">{likeCount}</div>
          </div>
          <div className="metric-container">
            <IoMdThumbsDown className={`metric-btn ${disliked ? 'disliked':''}`} onClick={()=>handleMetricClick('disliked')}/>
            <div className="metric-count">{dislikeCount}</div>
          </div>
          <div className="metric-container">
            <IoMdShareAlt className={`metric-btn ${shared ? 'shared':''}`} onClick={()=>handleMetricClick('shared')}/>
            <div className="metric-count">{shareCount}</div>
          </div>
        </div>
        <BsThreeDotsVertical className='three-dot-menu'/>
      </div>
    </div>
  )
}

export default PlayVideo