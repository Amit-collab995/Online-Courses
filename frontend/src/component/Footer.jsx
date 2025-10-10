import React from 'react'
import Logo from '../assets/logo.jpg'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()
  return (
    <div className='bg-black text-gray-300 py-10 px-6 '>
      <div className='max-w-7xl mx-auto flex lg;items-center items-start justify-center gap-[40px] lg:gap[150px] flex-col lg:flex-row'>
        <div className='lg:w-[40%] md:w-[50%] w-[100%]  '>
          <img src={Logo} className='h-10 mb-3 border-1 rounded-[5px]' alt="" />
          <h2 className='text-xl font-bold mb-3'>Virtual Courses</h2>
          <p className='text-gray-400 text-sm'>AI-powered learning platform to help you grow smarter. Learn anthing, anytime, anywhere.</p>

        </div>

        <div className='lg:w-[30%] md:w-[100%]'>
          <div className='text-sm space-y-1'>
            <li className='hover:text-white cursor-pointer' onClick={() => navigate('/')}>Home</li>
            <li className='hover:text-white cursor-pointer' onClick={() => navigate('/allcourses')}>All Courses</li>
            <li className='hover:text-white cursor-pointer' onClick={() => navigate('/login')}>Login</li>
            <li className='hover:text-white cursor-pointer' onClick={() => navigate('/profile')}>Profile</li>
          </div>
        </div>
        
        
        <div className='lg:w-[30%] md:w-[100%]'>
          <div className='text-sm space-y-1 '> Categories
            <li className='hover:text-white ' >Web Developement</li>
            <li className='hover:text-white ' >UI/UX Design</li>
            <li className='hover:text-white ' >App Developement</li>
            <li className='hover:text-white ' >AI/ML</li>
          </div>
        </div>


      </div>

      <div className='border-t border-gray-700 mt-10  text-sm text-center text-gray-500'>© {new Date().getFullYear()} Virtual Courses. All rights reserved.</div>
    </div>
  )
}

export default Footer