import ReactPlayer from 'react-player'
import './playVideo.css'
import { useGetPostQuery } from '../redux/services/flixtubeCore'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader/Loader'
import { IoMdThumbsUp, IoMdThumbsDown, IoMdShareAlt } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import React, { useState, useEffect } from 'react';


const PlayVideo = () => {
  const { postID } = useParams();
  const {data, isFetching, error} = useGetPostQuery({postID: postID})

  const [liked, setLiked] = useState(false)
  const [disliked, setDisLiked] = useState(false)
  const [shared, setShared] = useState(false)
  const [likeCount, setLikedCount] = useState(0)
  const [dislikeCount, setDisLikeCount] = useState(0)
  const [shareCount, setShareCount] = useState(0)

  useEffect(() => {
    // Update state based on the fetched data when it's available
    if (!isFetching) {
      setLikedCount(data.likes);
      setDisLikeCount(data.dislikes);
      setShareCount(data.shares);
      setLiked(data.liked);
      setDisLiked(data.disliked);
      setShared(data.shared);
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
    }}


    useEffect(() => {
      const apiUrl = `http://localhost:8000/posts/${postID}`;
    
      const postData = {
        liked: liked,
        disliked: disliked,
        shared: shared
      };
    
      console.log(postData);
    
   
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

  }, [liked, disliked, shared]);
  
  return isFetching ? <Loader/> :(
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
            <button className="subscribe-btn">Subscribe</button>
          </div>
        </div>
        <div className="metric-buttons flex-row">
          <IoMdThumbsUp className={`metric-btn ${liked ? 'liked':''}`} onClick={()=>handleMetricClick('liked')}/>
          <IoMdThumbsDown className={`metric-btn ${disliked ? 'disliked':''}`} onClick={()=>handleMetricClick('disliked')}/>
          <IoMdShareAlt className={`metric-btn ${shared ? 'shared':''}`} onClick={()=>handleMetricClick('shared')}/>
        </div>
        <BsThreeDotsVertical className='three-dot-menu'/>
      </div>
    </div>
  )
}

export default PlayVideo