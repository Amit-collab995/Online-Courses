import React from 'react'
import about from '../assets/about.jpg'
import video from '../assets/video.mp4'
import { TfiLayoutLineSolid } from 'react-icons/tfi'
import {BsFillPatchCheckFill } from 'react-icons/bs'


const About = () => {
  return (
    <div className="w-full min-h-[60vh] flex flex-col lg:flex-row items-center justify-center gap-10 px-6 py-10 md:px-12 lg:px-20 bg-gray-50">

      {/* 🖼️ Image + Video Section */}
      <div className="relative w-full lg:w-[45%] flex items-center justify-center">
        {/* Background Image */}
        <img
          src={about}
          alt="About"
          className="w-[85%] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] object-cover rounded-2xl shadow-md"
        />

        {/* Overlay Video */}
        <video
          className="absolute bottom-[-30px] right-[-10px] w-[70%] sm:w-[60%] md:w-[55%] rounded-xl border-4 border-white shadow-xl"
          controls
          autoPlay
          muted
          loop
          src={video}
        />
      </div>

      {/* 🧾 About Info Section */}
      <div className="w-full lg:w-[50%] flex flex-col items-start justify-center gap-5 text-center lg:text-left">
        
        {/* Heading */}
        <div className="flex items-center justify-center lg:justify-start gap-3 text-lg md:text-xl font-semibold text-blue-600">
          <span>About Us</span>
          <TfiLayoutLineSolid className="w-6 h-6 md:w-8 md:h-8" />
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-snug">
          Learn. Grow. Succeed — Empowering Students Through Knowledge.
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed max-w-[600px]">
          At <span className="font-semibold text-blue-600">Internship Hub</span>, 
          we believe in providing high-quality education that helps students and professionals 
          unlock their potential. Our courses are designed by expert educators to make learning 
          engaging, practical, and career-focused.
        </p>

        <div className='w-[100%] lg:w-[60%]'>

           <div className='flex  items-center justify-between mt-[40px] '>
             <div className='flex items-center justify-center gap-[10px]'><BsFillPatchCheckFill className='w-[14px] h-[14px]' /> Simplified Learning</div>
             <div className='flex items-center justify-center gap-[10px]'><BsFillPatchCheckFill className='w-[14px] h-[14px]' /> Expert Trainers</div>
           </div> 

           <div className='flex  items-center justify-between mt-[40px] '>
             <div className='flex items-center justify-center gap-[10px]'><BsFillPatchCheckFill className='w-[14px] h-[14px]' /> Big Experience</div>
             <div className='flex items-center justify-center gap-[10px]'><BsFillPatchCheckFill className='w-[14px] h-[14px]' /> LifeTime Access</div>
           </div>

        </div>

        {/* Button */}
        <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition">
          Learn More
        </button>
      </div>

    </div>
  )
}

export default About
