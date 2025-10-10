import React, { useState } from 'react';
import aiIcon from '../assets/ai.png';
// import micIcon from '../assets/mic.png';
import { FaArrowLeft } from "react-icons/fa";
import {RiMicAiFill} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { serverUrl } from '../App';
import start from '../assets/start.mp3';
// import Course from '../../../backend/modules/courseModel';

const SearchWithAi = () => {
  const startSound = new Audio(start)
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [listening, setListening] = useState(false);

  function speak(message){
    let utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
    startSound.play();
  }

  const speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new speechRecognition();


  if (!recognition) {
    toast.error("Speech Recognition is not supported.")
  }

  const handleSearch = async () => {
    setListening(true)
    if (!recognition)return;
    recognition.start()
    startSound.play()
    recognition.onresult = async (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      handleRecommendations(transcript);
      await console.log("Mic transcript:", transcript);

      
    }
  }

const handleRecommendations = async (query) => {
  
  try {
    const result = await axios.post(serverUrl + "/api/course/search", {input: query}, {withCredentials: true})
    console.log(result.data);
    setRecommendations(result.data);
    setListening(false)
    if (result.data.length > 0) {
      speak("These are the top courses I found for you")
    }
    else{
      speak("No courses found")
    }
  } catch (error) {
    console.log(error);
    setListening(false)
    
  }
}









  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex flex-col items-center  py-1 px-4 md:px-8">

        {/* search container */}

        <div className="bg-white shadow-xl rounded-3xl p-6 sm:p-8 w-full max-w-2xl text-center relative">

             <FaArrowLeft onClick={()=>navigate("/")} className="text-[black] w-[22px] h-[22px] cursor-pointer absolute left-6 top-6" />

            <h1 className="text-2xl flex items-center justify-center gap-1 sm:text-3xl font-bold mb-4 text-gray-800"><img src={aiIcon} alt="AI Icon" className="w-7 h-7" />Search with <span className="text-[#CB99C7]">AI</span></h1>

            <div className='flex items-center bg-gray-400 rounded-full overflow-hidden shadow-lg relative w-full '>

              <input type="text" className='flex-grow px-4 py-3 bg-transparent border text-white  placeholder:text-gray-700 focus:outline-none text-sm sm:text-base' placeholder='What do want to learn? (e.g. AI, MERN , Cloud...'   onChange={(e) => setInput(e.target.value)} value={input} />

              {input &&<button className="absolute overflow-hidden right-14 hover:bg-gray-50 p-1 sm:right-16  rounded-full "> <img src={aiIcon} alt="AI Icon" className="w-7 rounded-full h-7  " onClick={()=>handleRecommendations(input)}  /> </button>}

              <button className="absolute overflow-hidden right-2 sm:right-6 rounded-full hover:bg-gray-300 p-1  flex items-center justify-center " onClick={handleSearch}> <RiMicAiFill className='w-7 h-7 fill-black' /> </button>

            </div>
            


        </div>
        
        {recommendations.length > 0 ? (
          <div className='w-full max-w-6xl mt-12 px-2 sm:px-4 '>
            <h1 className='text-xl sm:text-2xl font-semibold mb-6 text-white text-center'>AI Search Results</h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8'>
              {
                recommendations?.map((Course ,index) => (
                  <div key={index} className='bg-white text-white p-5 rounded-2xl shadow-md hover:shadow-indigo-500/30 transition-all duration-200 border border-gray-200 '>
                    <h2 className='text-lg font-bold sm:text-xl text-black '>{Course.title}</h2>
                   
                    <p className='mt-2 text-black  text-sm '>Category: {Course.category}</p>
                    <p className='mt-1 text-black text-sm'>Level: {Course.level}</p>
                    <button onClick={() => navigate(`/viewcourse/${Course._id}`)} className='mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm sm:text-base hover:from-purple-600 hover:to-pink-600 transition-colors duration-200'>View Course</button>

                    <img src={Course.imageUrl} alt="" />
                  </div>
                  
                ))
              }
            </div>
          </div>

        ):(listening ? <h1 className='text-center text-xl sm:text-2xl mt-10 text-gray-400 '>Listening...</h1> : <h1 className='text-center text-xl sm:text-2xl mt-10 text-gray-400 ' >No Courses Found Yet</h1>)
      }
     
    </div>
  );
};

export default SearchWithAi;