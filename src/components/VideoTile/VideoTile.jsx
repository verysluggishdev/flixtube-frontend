import React from 'react'
import './videoTile.css'

const VideoTile = ({videoData}) => {
  return (
    <div className="video-tile">
      <img src={videoData.thumbnail} alt="" className='video-thumbnail'/>
      <div className="video-details">
        <img src={videoData.creatorAvatar} alt="" className="creator-avatar"/>
        <div className="video-info">
          <p className="video-title">{videoData.title}</p>
          <p className="video-creator">{videoData.creator}</p>
          <div className="flex-container">
            <p className="view-count">{videoData.viewCount/1000}k Views</p>
            <p className="upload-date">Uploaded {videoData.createdAt}</p>
          </div>
        </div>

      </div>
    </div>
    
  )
}

export default VideoTile