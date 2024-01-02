import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetPostsQuery } from '../../redux/services/flixtubeCore';
import { setPosts, setIsLoadingPosts, setActiveQueryFilters } from '../../redux/features/appSlice';
import './categoryNav.css'

const CategoryNav = ({categories}) => {
  const queryFilters = useSelector((state)=>state.app.activeQueryFilters)
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const category = document.getElementById(activeNavIndex.toString())?.textContent
  const dispatch = useDispatch()
  const {data, isFetching, error} = useGetPostsQuery({...queryFilters, category: category})

  useEffect(()=>{
    if (category && !queryFilters.category !== category) {
      dispatch(setActiveQueryFilters({...queryFilters, category: category}))
    } 
  }, [category])

  useEffect(()=>{
    if (!isFetching && !error) dispatch(setPosts(data));
    dispatch(setIsLoadingPosts(isFetching))
  }, [activeNavIndex, data, isFetching])


  const handleNavBtnClick = ((action)=>{
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