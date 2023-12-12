import { Tabs, TabList, Tab } from '@chakra-ui/react'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import './categoryNav.css'
import React, { useState} from 'react';

const CategoryNav = ({categories}) => {

  const [tabIndex, setTabIndex] = useState(0);
  
  return (
    <div className="category-nav">
      
      
      <div className="bg-wrapper" onClick={() => {

        if (tabIndex <= 0) {
          setTabIndex(categories.length - 1);
          return;
        }

        setTabIndex(tabIndex - 1);

        }}>

        <IoIosArrowBack  className='next-category-btn'/>
        </div>

        <Tabs size='sm' position="relative" variant="soft-rounded" index={tabIndex} colorScheme='blue' isFitted className='tabs'>

        <TabList>
          {categories.map((category, i)=>{
            if (i > categories.length - 1) return <></>
            return <Tab className='tab' onClick={()=>setTabIndex(i)} key={i}>{category}</Tab>
          })}
        </TabList>

        </Tabs>

        <div className="bg-wrapper" onClick={() => {

        if (tabIndex >= categories.length - 1) {
          setTabIndex(0);
          return;
        }

        setTabIndex(tabIndex + 1);

        }}>

        <IoIosArrowForward  className='next-category-btn' />

        </div>

      

    </div>
  )
}

export default CategoryNav