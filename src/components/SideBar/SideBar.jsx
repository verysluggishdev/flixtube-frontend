import './sidebar.css';
import { MdHome } from "react-icons/md";
import { MdAutorenew } from "react-icons/md";
import { BiSolidMoviePlay } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
import { MdWatchLater } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

const SideBar = () => {
  return (
    <div className='sidebar'>
      <section>
        <p tabIndex={1}><MdHome className='sidebar-icon'/> Home</p>
        <p tabIndex={2}><MdAutorenew className='sidebar-icon'/> New</p>
        <p tabIndex={3}><BiSolidMoviePlay className='sidebar-icon'/> Subscriptions</p>
        <hr />
      </section>
      <section>
        <p tabIndex={4}><MdWatchLater className='sidebar-icon'/>Watch Later</p>
        <p tabIndex={5}><FaHistory className='sidebar-icon'/>History</p>
        <p tabIndex={6}><AiFillLike className='sidebar-icon'/>Liked Videos</p>
        <hr />
      </section>
      <section>
        <h1>Explore</h1>
        <p tabIndex={7}>Python</p>
        <p tabIndex={8}>Cristiano Ronaldo</p>
        <p tabIndex={9}>Fortnite</p>
        <p tabIndex={10}>Ninja</p>
        <hr />
      </section>
      <section>
        <p tabIndex={11}><IoMdSettings className='sidebar-icon'/>Settings</p>
      </section>
      <section>
        <div className="content-faker"></div>
      </section>
    </div>
  )
}

export default SideBar
