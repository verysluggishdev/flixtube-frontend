import { useState, useEffect } from 'react';
import './post.css'

function determinePeriod(date){
  const givenDate = new Date(date);

  // Get the current date and time
  const currentDate = new Date();

  // Calculate the difference in seconds
  const secondsDifference = (currentDate - givenDate) / 1000;

  const minute = 60;
  const hour = 60*60;
  const day = 60*60*24;
  const week = 60*60*24*7;
  const month = 60*60*24*7*4;
  const year = 60*60*24*7*4*12;

  var period;

  if (secondsDifference < minute){
    period = Math.round(secondsDifference)
    return `${period} ${period == 1 ? 'second' : 'seconds'}`

  } else if (secondsDifference > minute && secondsDifference < hour){
    period = Math.round(secondsDifference / minute)
    return `${period} ${period == 1 ? 'minute' : 'minutes'}`

  } else if (secondsDifference > hour && secondsDifference < day){
    period = Math.round(secondsDifference / hour)
    return `${period} ${period == 1 ? 'hour' : 'hours'}`

  } else if (secondsDifference > day && secondsDifference < week){
    period = Math.round(secondsDifference / day)
    return `${period} ${period == 1 ? 'day' : 'days'}`

  } else if (secondsDifference > week && secondsDifference < month){
    period = Math.round(secondsDifference / week)
    return `${period} ${period == 1 ? 'week' : 'weeks'}`

  } else if (secondsDifference > month && secondsDifference < year){
    period = Math.round(secondsDifference / month)
    return `${period} ${period == 1 ? 'month' : 'months'}`

  } else if (secondsDifference > year){
    period = Math.round(secondsDifference / year)
    return `${period} ${period == 1 ? 'year' : 'years'}`
  }

}

const Post = ({postData}) => {
  const [uploadDate, setUploadDate] = useState(determinePeriod(postData.post.created_at));

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Update the upload date every minute
      setUploadDate(determinePeriod(postData.post.created_at));
    }, 60000); // 60 seconds * 1000 milliseconds

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [postData.post.created_at]);
  return (
    <div className="post">
      <img src={`http://localhost:8000/media/${postData.post.thumbnail}`} alt="" className='post-thumbnail'/>
      <div className="post-details">
        <img src={`http://localhost:8000/media/${postData.avatar}`} alt="" className="creator-avatar"/>
        <div className="post-info">
          <p className="post-title">{postData.post.title}</p>
          <p className="channelID">@{postData.channelID}</p>
          <div className="flex-container">
            <p className="view-count">100k Views</p>
            <p className="upload-date">Uploaded {uploadDate} ago</p>
          </div>
        </div>

      </div>
    </div>
    
  )
}

export default Post