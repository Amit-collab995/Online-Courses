import React from 'react'
import { MdOutlineCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaRupeeSign } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

const Logo = () => {
  return (
    <div className='w-[100vw]  min-h-[90px]  flex items-center justify-center flex-wrap gap-4 md:mb-[50px] '>
        <div className='flex items-center justify-center gap-2 px-4  py-2 rounded-3xl  hover:bg-gray-900 hover:text-white bg-gray-200 cursor-pointer '>
          <MdOutlineCastForEducation className='w-[20px] h-[20px] ' /> 20+ online Courses 
        </div>

         <div className='flex items-center justify-center gap-2 px-4  py-2 rounded-3xl shadow transition  hover:bg-gray-900 hover:text-white  bg-gray-200 cursor-pointer '>
          <SiOpenaccess className='w-[20px] h-[20px] ' /> LifeTime Access 
        </div>

         <div className='flex items-center justify-center gap-2 px-4  py-2 rounded-3xl  hover:bg-gray-900 hover:text-white bg-gray-200 cursor-pointer '>
          <FaRupeeSign className='w-[20px] h-[20px] ' /> Value For Money
        </div>

         <div className='flex items-center justify-center gap-2 px-4  py-2 rounded-3xl  hover:bg-gray-900 hover:text-white bg-gray-200 cursor-pointer '>
          <BiSupport className='w-[20px] h-[20px] ' /> LifeTime Support 
        </div>

         <div className='flex items-center justify-center gap-2 px-4  py-2 rounded-3xl  hover:bg-gray-900 hover:text-white bg-gray-200 cursor-pointer '>
          <FaUsers className='w-[20px] h-[20px] ' /> Community Support 
        </div>
    </div>
  )
}

export default Logo