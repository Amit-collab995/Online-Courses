import React from "react";
import { FaGooglePlay } from "react-icons/fa";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { FaUikit } from "react-icons/fa";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { AiOutlineOpenAI } from "react-icons/ai";
import { Si365Datascience } from "react-icons/si";
import { BsClipboard2Data } from "react-icons/bs";
import { RiOpenaiFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const ExploreCourses = () => {
  const Navigate = useNavigate();
  return (
    <div className="w-[100vw] min-h-[50vh]  flex flex-col lg:flex-row items-center justify-center gap-4 px-[30px] ">
      {/* Left Section */}
      <div className="w-[100%] lg:w-[350px] lg:h-[100%] h-[400px] flex flex-col   items-start  justify-center gap-1 md:px-[40px] px-[20px] ">
        <span className="text-[35px] font-semibold  ">Explore</span>
        <span className="text-[35px] font-semibold">Our Courses</span>
        <p className="text-[17px]  ">
          dolor sit amet consectetur adipisicing elit. Cumque cupiditate at
          atque modi consequuntur placeat consequatur ut excepturi a autem.
        </p>
        <button className="px-[20px] cursor-pointer  py-[10px] border-2 bg-black border-white text-white rounded-[10px] text-[18px] font-light flex items-center gap-2 mt-[40px] " onClick={()=>Navigate("/allcourses")} >
          Explore Courses{" "}
          <FaGooglePlay className="w-[30px] h-[30px]fill-white  " />{" "}
        </button>
      </div>

      {/* Right Section */}
      <div className="w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center   lg:gap-[60px] gap-[50px] flex-wrap mb-[50px] lg:mb-[0px] ">
        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center ">
          <div className="w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center ">
            <TbDeviceDesktopAnalytics className="w-[60px] h-[60px] text-[#6d6c6c] " />
          </div>
          Web Dev
        </div>

        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center ">
          <div className="w-[100px] h-[90px] bg-[#b5dbb1] rounded-lg flex items-center justify-center ">
            <FaUikit className="w-[60px] h-[60px] text-[#666363] " />
          </div>
          UI/UX Designing
        </div>

        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center ">
          <div className="w-[100px] h-[90px] bg-[#f6b7f6] rounded-lg flex items-center justify-center ">
            <MdAppShortcut className="w-[60px] h-[60px] text-[#6d6c6c] " />
          </div>
          App Dev
        </div>

        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center ">
          <div className="w-[100px] h-[90px] bg-[#51d06c] rounded-lg flex items-center justify-center ">
            <FaHackerrank className="w-[60px]   h-[60px] text-[#6d6c6c] " />
          </div>
          Ethical Hacking
        </div>

        

        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center ">
          <div className="w-[100px] h-[90px] bg-[#82ab7c] rounded-lg flex items-center justify-center ">
            <AiOutlineOpenAI className="w-[60px] h-[60px] text-[#6d6c6c] " />
          </div>
          AI/ML 
        </div>

        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center ">
          <div className="w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center ">
            <Si365Datascience className="w-[60px] h-[60px] text-[#6d6c6c] " />
          </div>
          Data Science
        </div>

        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center ">
          <div className="w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center ">
            <BsClipboard2Data className="w-[60px] h-[60px] text-[#6d6c6c] " />
          </div>
          Data Analytics
        </div>

        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center ">
          <div className="w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center ">
            <RiOpenaiFill className="w-[60px] h-[60px] text-[#6d6c6c] " />
          </div>
          AI Tools
        </div>
      </div>
    </div>
  );
};

export default ExploreCourses;
