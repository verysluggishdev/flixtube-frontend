import { Tabs, TabList, Tab } from '@chakra-ui/react'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import './categoryNav.css'
import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetPostsQuery } from '../../redux/services/flixtubeCore';
import { setPosts } from '../../redux/features/appSlice';

const CategoryNav = ({categories}) => {

  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const category = document.getElementById(activeNavIndex.toString())?.textContent
  const dispatch = useDispatch()
  const {data, isFetching, error} = useGetPostsQuery({category})


  useEffect(()=>{
    if (!isFetching && !error) dispatch(setPosts(data));
  }, [activeNavIndex, data])

  const handleNavBtnClick = ((action)=>{
    console.log(activeNavIndex)
    if (action === 'next'){
      
      if (activeNavIndex === categories.length-1){
        setActiveNavIndex(0)
      } else {
        setActiveNavIndex(activeNavIndex + 1)
      }  
    
    } else if (action === 'previous'){
      if (activeNavIndex === 0) {
        setActiveNavIndex(categories.length - 1)
      } else {
        setActiveNavIndex(activeNavIndex - 1)
      }
    }
  })
  
  return (
    <nav className="category-nav">
      <IoIosArrowBack className='nav-icon' onClick={()=>handleNavBtnClick('previous')}/>
      <ul>
        {categories?.map((category, i)=>{
          return <li className={`category ${i == activeNavIndex ? 'active':''}`} id={i} key={i} onClick={()=>setActiveNavIndex(i)}>{category}</li>
        })}
      </ul>
      <IoIosArrowForward className='nav-icon' onClick={()=>handleNavBtnClick('next')}/>
    </nav>
  )
}

export default CategoryNav