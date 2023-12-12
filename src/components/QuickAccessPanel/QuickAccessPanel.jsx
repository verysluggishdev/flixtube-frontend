import { FaPlayCircle } from "react-icons/fa";
import './quickAccessPanel.css'
import { FormControl } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';
import { MdOutlineWbSunny  } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { IoIosSearch, IoIosNotificationsOutline } from "react-icons/io";
import { NavLink } from 'react-router-dom';


const QuickAccessPanel = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const searchIconBgColor = colorMode == 'light' ? 'rgb(209, 209, 209)':'rgb(41, 41, 41)'
  const searchBarBorderColor = colorMode == 'light' ? 'rgb(190, 190, 190)':'rgb(85, 85, 85)' 
  return (
    <div className="quick-access-panel">
        <div className="logo">
            <FaPlayCircle className='logo-icon'/>
            <h1 className='logo-name'>FlixTube</h1>
        </div>
        <FormControl className='search-bar' style={{border: `1px solid ${searchBarBorderColor}`, borderRadius: '2rem'}}>
            <input type="text" name="" id="" placeholder='Search'/>
            <IoIosSearch className='search-icon' style={{backgroundColor: searchIconBgColor}}/>
        </FormControl>
        <div className="header-icons">
            {colorMode == 'light' ? <IoMoonOutline onClick={toggleColorMode} className='toggle-bg-btn'/> : <MdOutlineWbSunny onClick={toggleColorMode} className='toggle-bg-btn'/>}
            <IoIosNotificationsOutline className='notifications-btn'/>
            <NavLink to={'/account'}><VscAccount className='account-btn'/></NavLink>
        </div>
    </div>
  )
}

export default QuickAccessPanel