import './loader.css'
import loader from '../../assets/loader.svg'

const Loader = () => {
  return (
    <div className="loader content">
        <img src={loader} alt="loading" />
    </div>
  )
}

export default Loader