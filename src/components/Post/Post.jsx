import React from 'react'
import './post.css'

const Post = ({postData}) => {
  console.log(postData)
  return (
    <div className="video-tile">
      <img src={`http://localhost:8000/media/${postData.post.thumbnail}`} alt="" className='video-thumbnail'/>
      <div className="video-details">
        <img src={`http://localhost:8000/media/${postData.avatar}`} alt="" className="creator-avatar"/>
        <div className="video-info">
          <p className="video-title">{postData.post.title}</p>
          <p className="video-creator">{postData.post.channelID}</p>
          <div className="flex-container">
            <p className="view-count">100k Views</p>
            <p className="upload-date">Uploaded {postData.post.created_at}</p>
          </div>
        </div>

      </div>
    </div>
    
  )
}

export default Post