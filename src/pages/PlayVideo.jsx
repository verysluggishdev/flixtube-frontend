import ReactPlayer from 'react-player'
import './playVideo.css'
import { useGetPostQuery } from '../redux/services/flixtubeCore'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader/Loader'


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
    </div>
  )
}

export default PlayVideo