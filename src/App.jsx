
import { useColorMode } from '@chakra-ui/react';
import QuickAccessPanel from './components/QuickAccessPanel/QuickAccessPanel';
import CategoryNav from './components/CategoryNav/CategoryNav';
import React, { useState, useEffect } from 'react';
import SideBar from './components/SideBar/SideBar';
import './app.css'
import Discover from './pages/Discover';
import Account from './pages/Account';
import PlayVideo from './pages/PlayVideo';
import { Route, Routes } from 'react-router-dom';

const categories = ['all', 'sports', 'music', 'entertainment', 'gaming', 'comedy', 'trailers', 'drama', 'hollywood', 'Africa', 'Kampala']



const videoData = {
  thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRteOmR370G0SkmmwCNNVvAe_065YyvRs3jHw&usqp=CAU',
  title: '2023 YLYL mEMEs to make u shit yo pants straight up',
  creator: 'bruhman',
  createdAt:'23/10/19',
  viewCount: 5000,
  creatorAvatar: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBEREhISEhISEhERERESEhcRERERFBgRGBMYGhcYFxcbICwkGx0pHhcXJjYlKS4wMzMzGiI5PjkxPSwyMzABCwsLEA4QGhISGjIgISkyMjIyMjIyMDUyMjIyMjIyMjIyMjIyMjIyMjAwMjIyMjIyMjIyNDIyMjIyMjIyMjIyMv/AABEIAOEA4AMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIDBAUGBwj/xAA/EAACAQIDAwoCBwcEAwAAAAABAgADEQQhMQUSQQYiUWFxcoGRobETMgcjM0JSwdFigpKywuHwFFNz8TRjov/EABoBAAMBAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAuEQACAQIFAQcEAgMAAAAAAAAAAQIDEQQFEiExQUJRYXGRsdETgaHwIsEGFPH/2gAMAwEAAhEDEQA/AOEEcI0R4mpyscIojRHCIkcIoiCKICY4RREEeogIUCPCxUWSqkQEYWBWVMTtjDplvb7Dgg3vXSRYTbArPupScjibrYDpMVyvpy7i8RGmSMIwxkDYlo6KBABN2NIiVMTTQ7ruita9mYDKSrZhdSCOkEEecZVmVyIxhLLJImWAyAxDHsI0iAxhjTHmMMaKQyNjo2MoDEjjGmA0TiOjRHSSGOEcI0RwgSOEcBBRJFWBIirJVWCqLgXzNyB1D/uWESA7DMlBZjZVBJJ0AE5Ta212rEqpIpA5AZFutv0mnyqxm6q0VObc5+6DkPP2nLSGzalC25JQpM7Kii7MbAdc7fBYJaCBF11Y9LcTMfkphLs9Uj5eYvadT5W850lQRomrK+xXaRGTMIwrGYEcesN2OVYwK20NnrXS2jj5G6D0HqnKUa9Wg5AJVgbMp0y4EcZ3NMTm+VOFCulUDJwVbvDQ+XtJZ0U30ZrbNxy4hLjJ1+dejrHVJ3Scbs7FtRqK40vZh0rxE7hSGAYZhgCD1GNMU4WexTZJEyxNt4n4VPmnnud1erpPl7xMBV+JSR9Tazd4ZH/OuO4tO1xGEiMsOsgYRoZHGxxjYximNMcY0wGicR0aIokkMeI5Y0R6CBJLTEsokjprIdsYn4NFiMnfmL2kZnwF4AlcwcbtRhid9TzaZ3AOBUHneefpOuoVVdVdTdWAI8Z5zOl5L47Wix6WT+ofn5yEzecNtjL23W38RUN8lbdHYuXveZ0krm7selifWMiNEd1sCnuYan+0Cx7STNBhOZwm30pUaaBWd1Wx+6BbTOU8RyixDaFUH7IufMyrmGhtnXmnE+FODfaNdtatTwdh7Rn+sq/7lT+N/wBYrh9HxO+KQCTh6e1cQulZ/Ft73l2jyjxC/NuuOtbHzEdxfRZ1yrMblSAaAPQ628jIKPKdD89Nl60Ib0NpByh2lTqpTWm29dizZEWsLAHzgOMWpI52dfybxG9R3TrTYr+6cx+Y8JyE0tl474K1rHnMgCd69r+AJPhEnuayV0P2/i/iVSAebT5g7fvHz9pY5N4izNTOjDeXvDX09phkyXDVjTdXGqsD/aFxtbWOxqLKriXSwZQy5hgGHYZVcSzArmMMkaRmNDFMaYsQxjROIojBHiIhj1kqCRJLNMREliks5flFit+ruD5aYKjvfe9gPCdHjcQKNJ34gWXrY6ThmYkknMnM3kyZrTj1GyXD1ijK6mxVgR4SKEk2HObknpJMbCEACEIQAIQhAAhCEACEIQAIQhAAhCEAOq2BX36RQ60zb905j8/KWaqzA2BX3KwU6ON3x1H+dc6SsJaMpLcouJEZM4kRlIkSIYsSMaJRHrIxJFiZJLTEtUllemJZLhEZ20VSx8IiVuYXKfFXZaQ0TnN3iMvIe8wJLiKpd2c6sxY+JkUzbudKVlYIQhAYQhCABCEIAEIQgAQhCABCEIAEIQgAQhCAD6blWDDVSCO0TtN8OquNGUMPETiJ1eyXJw6X4bwHYGMqJE+BagkTSarIWlozGxIsSMaJBJFkQkixMks05U5QV92kEH32APdGfvaWqZi4zCLWQocjqp6GETCOzOLhJKtJkYqwswNiJHMzoCEIQAIRbQtABITewHJXG1xcUvhr+Kt9WPLX0mxT+j2uR9vR3ugB/e05p4yhB2c17+xxVcxwtN6ZVFf19rnEwnTbU5GY3DgtuLUUC5NElrDrUi/lOZIm1OpCorxdzopVqdVaoSTQQhCWahCFpp7L2PXxTWo0y1vmY3CDtb8opSUVeTsiZzjCLlJ2XiZkJ21D6PaxA3q9JWPAB2z7bCVtp8hMZRBZQtdRn9XvFrd0jPwM5oY2hN2U/wB8+DjhmWFm9Mai/NvW1jkoR7KQbHIjUHURk6juCdpRpblNE/CgB7bZ+t5y+zKPxKyLw3gx7BmZ1lYyokTKlQyFpI5kTS0ZiRIpiRjQ8SQSMR4iZJMhlqk8pKZMjRCIds7N+Mu+g+sUfxL0dvROTItO8pPMjlDs5SprLkwtvjgc7X7ZLRpCXQ5mEISTUlpIXYKoLMxAUDMknICeocmuS1PDKtSqofEHO5zCdS9fXOd+j3Zm/WbEMObRFk/5TbPwHvPRp4WaYt6vowdu/wCD5bPMwlq/14Oy7Xj4fZCqtyBxOU1qVMKLAdszKJswPXNaedh0t2ePhIqzYhE85+kPksoVsZQUKR9sqjIj8Y6+mejyDG0lem6sLqylTfSxE7adV0pal+o9GjXlQnrj0/K7j5ztCWsdQ+FVq0/9urUp/wALESrPoE00mj6+MlJJrhmvye2UcXXWkCQoG/UI4INbdZyHjPXMLhUpItOmu6i5AD/MzOP+jTDjcxFXizJS8At/zHlO2nzmaV5TquHRe9r/ANnxueYmVSu6XZj72u3+bF/AoLFuJNpaMqYB9V8RLcypNaUc9G301Y86+kfk4u6cXSUBh9sBoy58+3SPaeZ2n0FtiktSk1NhcVFZT2EW/OeAVEKkqdQbHtGU9nL6rlGUH0t6M+kyjEOcZ032bej6fazNfk0gLu3FUsPE/wBptVjMbkx89TuD3mxWnpx4PSlyVXMjMe8YZSJGwMIRlDhHCNEcIED1j1MYI6SSyzTaT1aYqI6H7yley/GVKZlyiYAtjhKiFSVORUkHtEZNvlJhdyoHA5tQZ98a+lvWYkzOlO56d9HdMDCMRq2Ie/gqW9p1k4T6OMetq2HPzX+MnXkoIHkDO6nyePi44id++58HmsJQxdTV1d/swmjhcQGFj8w9ZnQnPCbg7o4qVR03dG1KeNrC24NeMqfFbTeNvGUNrY9cNRqVW0QGw6XI5o8TNnUc/wCMVu9jpdZ1f4QW72PJuUTg4vEkafHqDxDEH1Ey5LVqlmZmzZiWPaTcyKfWQjpio9ysffU4aIRj3JL0R6J9GtYGlXp/eWqtTwZbf0ztZ5FyW2t/pMQHb7Nx8Op1KSOdbqI9564jBgCCCCAQQbgjgQZ83mlFwruXSX/D43O8PKniXPpLdeln7DlYg3GolsY42zFz2ynCcEZyjwzyYVJQ4YtesTdm4Z9gE8LxFTfdn/G7N5m89Q5Z7YXD0Gpqfrq6lAAc1pkWZj4ZDrM8pnvZRTkoyqPtW/B9XkFGUYTqy7Vrfa/ybvJoZ1T0Ko8yf0mtVMqbBoblIudXa/7oyH5+csVDPaXB7cuSB4yOaNMpEjYQiRlDxHCMEeIEjxHRojhJJZKkt0pWpiTVcQlJC7GyjzJ4AdcAQbTwgrU2T72qHoYafp4zh3QqSCLEEgjrE2MVjK2IublKV7AA69p4+0oVsNYXW5I1i0tq9jeKsJgsW9F1qU23XQ3Bz8j1GeqbA5SUcWoFwlYDnUybZ8Sn4hPIY9XIIINiNCNZw4vBwxC32fR/vQ4cfl1PGJX2kuH/AE+9Hu0J5JguVeOo2ArFwNBV+s9Tn6yeryzxzCwdU60QA+t547yitflW79/g+ef+P4lOylFrvu/g9Lx+PpYdDUquEQdJsT1KNSeoTy/lNyhfGPYApRQ/Vrxv+Juv2mRicXUrNvVXeo3S7Fj4dErXnp4TL4UHqk9UvbyPay/KYYV65PVP8Ly+QhCE9A9cJ03J7lXVwgFNx8WjwFzvL3D0dU5mEzq0oVY6Zq6Ma9CnXg4VFdHqdPlxgSLk1VPQaQJ8wbTM2ny9FiuGpG/461rDrCKc/EzgLwvOOGWYeLvZvzex51PI8JCWqzfg3t/RYxeJeq7PUYu7Zktmf7RMJQNR1QcTn1DiZABfxnU7IwHwU32HPcfwr0frPQS6I9XaKsi6wCqFXIKAB2CVXaS1XlZjNDMaTGmKY2MEBiRTCMYojhGiOECR4kiSMSRJIixTmVt9y1SlSvYZMe1jb2B85q0pncocO3MrIPkybqF7qezWJlQ5HBBbdtzbWt1SjWosmYBder5h4cZboV1dQw8RxBk09CUVNbG5g1aIbNLX4jT/AKlUi2RnRVcMj5kZ9IyPmJUrbN3tH/iAPqJzTw8ugjGhJKybrFdd0kSOcoBCEIAEIQgAQhCABHKhJsASeqS4SiHYKTa9/QTVrqtGmd0WLDdHSSeuawp6k29kBNyfwSFfitzmDEKDoLceszVqvK+yaJp0EByLXc+OnpaOqNJXBlLkjdpCTHMZGZRIsbFMSMaCIYQgMeIojRHCBI4SRJGI9YmIs0zHY/7Cr3G9pGhlgKGUqdGUqewi0QI5zZ9EFAynde5BOoOehEvKT94C/UcpnYBjTqPSfI3t+8P1mrOyjZxVjpQxnA1IHaQIolauN9tz7osah9l8YpwoGaMyH9k5eRyl6nd2QGPjltUfvE+ecrzQ2jQcEMxDXyuBbsuJnzz5q0mIJeTZzsoYFbEXzJB9pRm/gaqlEG8LhbEXF5dGEZOzAzjsyoPw+cShgWb7wGQOYa/tNt3ABPQCZVp1Rf4jlF3lUAb1zbM59ec3dGCaGZWMw3wyBe9xe9rcZWmhtSoGKEX0OZBF9NLzPnLUSUmlwIt7O+0Xja59DNHZ1H/U1Wap8lO3N67mw9M5R2dzd+odEU27xm3yepFaTOdajkjsGXveV2UvMmTsi/WaVKhk9VpVcxGQwxIGBlAIYkUxDAaEiRTEgMeI4RoiiBI4R6xgjxEImQyzSMqrLVIRCMvb2zmY/GQc5QN8DXLRhKdLH7yf+zJQOk8D2Tf2jjBQQsczog6W4eE57ZtEkmq+rE28dTNKN9Vom1Nuxcw9LcW2pJux6WOskJjowG7HoX3P9vediSSsjUKiBlKsMjrMLF4RqZzzHA/r0ToI0gHI5jrkVKSn5iOXmts2mjqQyglT0Z2MlrbMRs1JU+Y8o3CYN6b33lKkWOonPClKEldXQh+IwtNUZgguFJGssUqCCxVFGQ4CJix9W/cb2kqaDsHtOlQSlwMyNsNd1HQvuZSpUy5CqLkzZr4BWLOSxPRcAdksUKaqOYAAc8uMwdFym2xGZSou5XDqLEMS51FwdewCdQECIqLooAHYJgB/hYpH0V7BvHI/kZ0VWYyum0Z1CnUMrNJ6kgaCIGmBiQjAQwMIQGIYkWJAY8RREEUQJHCPURokqCITJEEt0lkNJZU27jPh091TzqgI7E4n8om7AlczcdWOJr7oP1aZC2luJ8ZeAsLDQZCVsBh9xM/mbM/kJbnZRp6VvydMVZDHcKCTwF4lFSFF9Tme05mR1ucyJw+duwaetvKWJot35DCEISgGMfce8fGPqo67+Qj4gGVBdWHSp9o3DtdEP7C+0eZFg/s06hbyi7QmSgyOkbFl/CbjunT846npboJH6RlXmsrcDzD2HT194N9RkW0aO8htqvOHZx9JqbNxPxaKsfmXmt2jj4ixlWVtlP8ACrvSPyuOb26j0uJzYiNmpETWxp1RKzCXKyyqwmJiQmEcY2MBIkWJAoSEIsAHCKIgiiBI9ZOgkKyenJEWUsBc5AC57JzqscRWaofkU2UHoHyj85e21iSqCmvz1DbL8PHzyHnG4aiEQL0a9Z4zSlDVLwRrBE0ISDFOQhA+ZrIvacp2t23NRuG5xZ/xGy91ch63MsxiIFAUaAAR8UVZAEIQlARE88DoUnzP9jJZBTzeoejcXyF/6pPJiASvg/kt0O4/+zLEr4XR++/veD5QhyHnOO63mLflHVU3lI6Rl28I0m1QftIfRh+smguLDI6L7yg9Iz7eMp7SUjcqLkyEeV8vX3lijk7r0kOOw6+o9ZJWTfVl6QRIktcLftxGhTqh0Vxo6g+PEStUEpbCxHMamdUJI7Dr6+8vPOJGD5IWjDHtGGUISIYpiGBQkWJAwAeIohCBJIsnpwhJEZWP/wDKp91fdpchCdOH4fmbw4HStivmp/8AIf5TCE3nwymWIsISgQQhCAyvQ1qd/wDoWWIQkx4EgkGG+/32hCD5QCv89PuP7pJIQj6sZCftR3G/mEnEIRR6gZezP/Ifsf8Ammw8ITz0Yz5ImjDEhKIEMDCEChIGLCAH/9k='
  
}

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

