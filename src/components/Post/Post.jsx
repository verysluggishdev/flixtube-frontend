import { useState, useEffect } from 'react';
import './post.css'
import { FaTrash } from "react-icons/fa6";
import DeletePostForm from '../forms/DeletePostForm';
import { submitForm } from '../AccountMenu/AccountMenu';
import { FaPenToSquare } from "react-icons/fa6";
import UpdatePostForm from '../forms/UpdatePostForm';
import { NavLink } from 'react-router-dom';
import { Tooltip } from '@chakra-ui/react';

function determinePeriod(date) {
  const givenDate = new Date(date);
  const currentDate = new Date();
  const secondsDifference = Math.round((currentDate - givenDate) / 1000);

  const timeUnits = [
    { unit: 'year', duration: 60 * 60 * 24 * 7 * 4 * 12 },
    { unit: 'month', duration: 60 * 60 * 24 * 7 * 4 },
    { unit: 'week', duration: 60 * 60 * 24 * 7 },
    { unit: 'day', duration: 60 * 60 * 24 },
    { unit: 'hour', duration: 60 * 60 },
    { unit: 'minute', duration: 60 },
    { unit: 'second', duration: 1 },
  ];

  for (const { unit, duration } of timeUnits) {
    if (secondsDifference >= duration) {
      const period = Math.round(secondsDifference / duration);
      return `${period} ${unit}${period === 1 ? '' : 's'} ago`;
    }
  }

  return 'Just now';
}

const Post = ({postData, viewedByOwner}) => {
  const [uploadDate, setUploadDate] = useState(determinePeriod(postData.created_at));
  const [deletePostFormIsOpen, setDeletePostFormIsOpen] = useState(false)
  const [updatePostFormIsOpen, setUpdatePostFormIsOpen] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Update the upload date every minute
      setUploadDate(determinePeriod(postData.created_at));
    }, 60000); // 60 seconds * 1000 milliseconds

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [postData.created_at]);

  return (
    <div className="post">
      <NavLink to={`/post/${postData.id}`}><img src={`http://localhost:8000/media/${postData.thumbnail}`} alt="" className='post-thumbnail'/></NavLink>
      <div className="post-details">
        {!viewedByOwner? <img src={`http://localhost:8000/media/${postData.owner.avatar}`} alt="" className="creator-avatar"/>: ''}
        <div className="post-info">
          <p className="post-title">{postData.title}</p>
          {!viewedByOwner? <p className="channelID">@{postData.owner.channelID}</p>: ''}
          <div className="flex-container">
            <p className="view-count">100k Views</p>
            <p className="upload-date">Uploaded {uploadDate}</p>
            {viewedByOwner? <Tooltip label='Delete Post' fontSize='md'><span><FaTrash className='delete-post-btn' onClick={() => setDeletePostFormIsOpen(true)}/></span></Tooltip>: ''}
            {viewedByOwner? <Tooltip label='Edit Post' fontSize='md'><span><FaPenToSquare className='update-post-btn' onClick={() => setUpdatePostFormIsOpen(true)}/></span></Tooltip>: ''}
            
          </div>
        </div>

      </div>
      <DeletePostForm
        isOpen={deletePostFormIsOpen}
        onClose={()=>setDeletePostFormIsOpen(false)}
        onSubmit={submitForm}
        postID={postData.id}
      />
      <UpdatePostForm
        isOpen={updatePostFormIsOpen}
        onClose={()=>setUpdatePostFormIsOpen(false)}
        onSubmit={submitForm}
        postID={postData.id}
      />
    </div>
    
    
  )
}

export default Post