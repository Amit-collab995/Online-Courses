import axios from "axios";
import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const CreateCourses = () => {
  const navigate = useNavigate();
  const [title , setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [loading,setLoading] = useState(false)


  const handleCreateCourse = async ()=> {
    setLoading(true)
    try {
     const result =  await axios.post(serverUrl + "/api/course/create", {title, category}, {withCredentials:true})
     console.log(result.data)
     navigate("/courses")
     setLoading(false)
     toast.success("Course Created")
    } catch (error) {
      setLoading(false)
      console.log(error);
      toast.success("course created failed")
      
    }
  }



  return (
    <div className="min-h-screen flex  flex-col items-center justify-centerbg-gray-100 px-4 py-10">
      <div className="max-w-xl w-[600px] mx-auto p-6 bg-white shadow rounded-md mt-10 relative">
        <FaArrowLeftLong
          onClick={() => navigate("/courses")}
          className="top-[8%] absolute left-[5%] w-[22px] h-[22px] cursor-pointer "
        />
        <h2 className="text-2xl font-semibold mb-6 text-center ">
          Create Courses
        </h2>
        <form className="space-y-5" onSubmit={(e)=>e.preventDefault()} >
          <div>
            <label
              className="text-gray-700 block text-sm font-medium mb-1 "
              htmlFor="title"
            >
              Course Title
            </label>
            <input
              id="title"
               onChange={(e)=>setTitle(e.target.value)}
               value={title}
              placeholder="Enter Course title"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[black] "
              type="text"
            />
          </div>
          <div>
            <label
              className="text-gray-700 block text-sm font-medium mb-1 "
              htmlFor="cat"
            >
              Course Category
            </label>
            <select id="cat"
            onChange={(e)=>setCategory(e.target.value)}
              placeholder="Enter Your category"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[black] " >
                <option value="">Select Category</option>
                <option value="App Development">App Development</option>
                <option value="AI/ML">AI/ML</option>
                <option value="AI Tools">AI Tools</option>
                <option value="Data Science">Data Science</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Ethical Hacking">Ethical Hacking</option>
                <option value="UI UX Designing">UI UX Designing</option>
                <option value="Web Development">Web Development</option>
                <option value="Others">Others</option>
               
                
              </select>
          </div>
          <button onClick={handleCreateCourse} className="w-full bg-black text-white rounded px-4 py-2">{loading? <ClipLoader size={30} color="white" />: "Create"}</button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourses;
