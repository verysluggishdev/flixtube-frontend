import ReactPlayer from 'react-player'
import './playVideo.css'

const PlayVideo = () => {
  return (
    <div className="play-video-page content">
      <div className="video">
      <ReactPlayer 
    url='http://localhost:8000/media/QnVybmEgQm95IC0gR2l6YSAoZmVhdC4gU2V5aSBWaWJleikgW09mZmljaWFsIE11c2ljIFZpZGVvXS5tcDRAMjAyMy0xMi0yMSAxODoyMzoyMi4xNzE1NjI=.mp4' 
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