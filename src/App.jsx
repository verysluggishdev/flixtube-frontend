
import { useColorMode } from '@chakra-ui/react';
import QuickAccessPanel from './components/QuickAccessPanel/QuickAccessPanel';
import CategoryNav from './components/CategoryNav/CategoryNav';
import React, { useState, useEffect } from 'react';
import {SideBar} from './components/SideBar/SideBar';
import './app.css'
import Discover from './pages/Discover';
import Account from './pages/Account';
import PlayVideo from './pages/PlayVideo';
import { Route, Routes } from 'react-router-dom';

const categories = ['all', 'sports', 'music', 'entertainment', 'gaming', 'comedy', 'trailers', 'drama', 'hollywood', 'Africa', 'Kampala']

function determineNumberOfTabsToRender(windowWidth){

  switch (true){
    case windowWidth > 1000:
      return 10
    
    case windowWidth < 1000 && windowWidth > 600:
      return 7;

    case windowWidth < 600:
      return 5;

    default:
      return 0;
  };

}

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const numberOfTabsToRender = determineNumberOfTabsToRender(windowWidth);

  const { colorMode, toggleColorMode } = useColorMode();

  const headerBgColor = colorMode == 'light' ? 'white' : 'rgb(31, 31, 39)';
  
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };


  useEffect(() => {
    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this effect runs only once during mount
  

  return (
      <div className='app'>
          
          <header style={{backgroundColor: `${headerBgColor}`}}> 
            <QuickAccessPanel className='quick-acess-panel'/>
            <CategoryNav className='category-nav' categories={categories.slice(0, numberOfTabsToRender)}/>
          </header>

          <section className="main">
            <SideBar className='sidebar'/>
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/account" element={<Account />} />
              <Route path="/post/:postID" element={<PlayVideo />} />
            </Routes>
          </section>
      </div>
  );
}



export default App;

