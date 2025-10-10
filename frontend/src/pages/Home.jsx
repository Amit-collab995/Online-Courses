import React from 'react'
import Nav from '../component/Nav'
import Home1 from '../assets/home1.jpg'
import { FaGooglePlay } from "react-icons/fa";
import ai from '../assets/ai.png'
import searchai from '../assets/SearchAi.png'
import Logo from '../component/Logo';
import ExploreCourses from '../component/ExploreCourses';
import CardPage from '../component/CardPage';
import { useNavigate } from 'react-router-dom';
import About from '../component/About';
import Footer from '../component/Footer';
import ReviewPage from '../component/ReviewPage';

const Home = () => {
  const Navigate = useNavigate();
  return (
    <div className='w-[100%] overflow-hidden'>
        <div className='w-[100%] lg:h-[140vh] h-[70vh] relative'>
            <Nav />

            <img src={Home1} className='object-cover z-10 md:object-fill lg:object-fill w-[100%] lg:h-[100%] sm:mt-[70px] lg:mt-[70px] h-[50vh]' alt="" />
            
            <span className=' lg:text-[70px] md:top-9  absolute md:text-[40px] lg:top-[10%] top-[14%]  w-[100%] flex items-center justify-center text-white font-bold text-[20px]  '>Grow Your Skills to Advance </span>
           
             <span className=' lg:text-[70px]  absolute md:text-[40px] lg:top-[18%] top-[18%] w-[100%] text-white flex items-center justify-center  font-bold text-[20px]  '>Your Career Path </span>

             <div className=' absolute lg:top-[30%]  top-[75%] md:top-[80%]  w-[100%] flex items-center justify-center gap-3 flex-wrap '>
              <button className='px-[20px]    py-[10px] border-2 lg:border-white border-black lg:text-white text-black rounded-[10px] text-[18px] flex gap-2 cursor-pointer  active:scale-110 ' onClick={()=>Navigate("/allcourses")} >View All Courses <FaGooglePlay className='w-[30px] h-[30px] lg:fill-white fill-black ' /></button>
              <button className='px-[20px] py-[10px] border-2 lg:border-white lg:bg-white bg-black text-white border-black lg:text-black   rounded-[10px] text-[18px] flex gap-2 cursor-pointer  active:scale-110  ' onClick={()=>Navigate("/search")} >Search with Ai <img src={ai} className='w-[30px] h-[30px] lg:fill-white lg:block hidden fill-black '  alt="" /> <img src={searchai} className='w-[30px] h-[30px] lg:fill-white block lg:hidden fill-black '  alt="" />   </button>

             
             </div>
             




             

        </div>
        <Logo/>
        <ExploreCourses/>
        <CardPage/>
        <About />
        <ReviewPage />
        <Footer />

    </div>
    
  )
}

export default Home