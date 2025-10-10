import React from 'react'
import { IoPersonCircle } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";

const Profile = () => {
  const { userData } = useSelector((state) => state.user)
  const navigate = useNavigate()
  return (
    <div className='min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center'>
        <div className='bg-white shadow-lg rounded-2xl  p-8 max-w-xl w-full relative'>
          <FaArrowLeft className='absolute top-4 left-4 text-black cursor-pointer' onClick={() => navigate("/")} />
          <div className='flex flex-col items-center justify-center'>
            {userData?.photoUrl ? <img src={userData?.photoUrl} className='w-24 h-24 rounded-full object-cover border-4 border-black' alt="" /> : 
            <div className='w-24 h-24 rounded-full object-cover text-[30px]  text-black border-4 border-black flex items-center justify-center'>
              {userData?.name.slice(0, 1).toUpperCase()}
            </div>
            }
            <h2 className='text-2xl font-bold mt-4 text-gray-800'>{userData?.name}</h2>
            <p className='text-gray-600 mt-1'>{userData?.role}</p>
           
            </div>
            <div className='mt-6 space-y-4'>
              <div className='text-sm flex items-center justify-start gap-1'>
                <span className='font-semibold text-gray-700'>Email:- </span>
                <span>{userData?.email}</span>
              </div>
              <div className='text-sm flex items-center justify-start gap-1' >
                <span className='font-semibold text-gray-700'>Bio:- </span>
                <span>{userData?.description}</span>
              </div>
              <div  className='text-sm flex items-center justify-start gap-1'>
                <span className='font-semibold text-gray-700'>Enrolled Courses:- </span>
                <span>{userData?.enrollCourses.length}</span>
              </div>
            </div>
            <div className='mt-6 flex gap-4 justify-center' onClick={() => navigate("/edit-profile")} ><button className='bg-black text-white px-4 py-2 rounded-xl'>Edit Profile</button></div>
        </div>    
    </div>
  )
}

export default Profile  