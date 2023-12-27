import ReactPlayer from 'react-player'
import './playVideo.css'
import { useGetPostQuery } from '../redux/services/flixtubeCore'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader/Loader'
import { IoMdThumbsUp, IoMdThumbsDown, IoMdShareAlt } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";


const PlayVideo = () => {
  const { postID } = useParams();
  const {data, isFetching, error} = useGetPostQuery({postID: postID})
  console.log(data)
  return isFetching ? <Loader/> :(
    <div className="play-video-page content">
      <div className="video">
        <ReactPlayer 
          url={`http://localhost:8000/media/${data?.post.video}`}
          playing={true}
          controls={true}
          width={'100%'}
          height={'100%'}
        />
      </div>
      <h1 className="post-title">{data?.post.title}</h1>
      <div className="container">
        <div className="flex-row post-creator-info">
          <img src={`http://localhost:8000/media/${data?.avatar}`} alt="" className="avatar" />
          <div className="flex-col">
            <p className="channelID">@{data?.channelID}</p>
            <button className="subscribe-btn">Subscribe</button>
          </div>
        </div>
        <div className="metric-buttons flex-row">
          <IoMdThumbsUp className='metric-btn'/>
          <IoMdThumbsDown className='metric-btn'/>
          <IoMdShareAlt className='metric-btn'/>
        </div>
        <BsThreeDotsVertical className='three-dot-menu'/>
      </div>
    </div>
  )
}

export default PlayVideo