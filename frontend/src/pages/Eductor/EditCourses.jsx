import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import img from '../../assets/empty.jpg'
import { FaEdit } from "react-icons/fa";
import { serverUrl } from "../../App";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { setCourseData } from "../../redux/courseSlice";

const EditCourses = () => {
  const navigate = useNavigate();
  const [isPublished, setIsPublished] = useState(false);
  
  const thumb = useRef()
  const {courseId} = useParams()
  const [selectCourse, setSelectCourse] = useState(null)
  const [title, setTitle] = useState('')
  const[subTitle, setSubTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [level, setLevel] = useState('')
  const[price, setPrice] = useState('')
  const [frontendImage, setFrontendImage] = useState(img)
  const [backendImage, setBackendImage] = useState(null)
  const [loading, setLoading] = useState(false)
   const [loading1, setLoading1] = useState(false)
   const dispatch = useDispatch()

   const {courseData} = useSelector(state=>state.course)



  const handleThumbnail = (e) => {
    const file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }


  const getCourseById = async () => {
    try {
      const result = await axios.get(serverUrl + `/api/course/getcourse/${courseId}`, {withCredentials:true})
      setSelectCourse(result.data)
      console.log(result.data);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
     if(selectCourse){
      setTitle(selectCourse.title || "")
      setSubTitle(selectCourse.subTitle || "")
      setDescription(selectCourse.description || "")
      setCategory(selectCourse.category || "")
      setLevel(selectCourse.level || "")
      setPrice(selectCourse.price || "")
      setIsPublished(selectCourse?.isPublished )
      setFrontendImage(selectCourse.thumbnail || img)
     }
    //  console.log(selectCourse);
     
  },[selectCourse])

  

  useEffect(()=>{
    getCourseById()
  },[])

  const handleEditCourse = async() => {
    setLoading(true)
    const formData = new FormData()
    formData.append("title", title)
    formData.append("subTitle", subTitle)
    formData.append("description", description)
    formData.append("category", category)
    formData.append("level", level)
    formData.append("price", price)
    formData.append("isPublished", isPublished)
    formData.append("thumbnail", backendImage);


    try {
      const result = await axios.post(serverUrl + `/api/course/editcourse/${courseId}`, formData, { withCredentials:true})

      console.log(result.data);
      const updateData = result.data


      // if(updateData.isPublished){
      //    const updateCourses = courseData.map(c => c._id === courseId ? updateData : c)

      //    if (courseData.some(c => c._id === courseId)) {
      //      updateCourses.push(updateData)
      //    }
      //    dispatch(setCourseData(updateCourses))
      // }
      // else{
      //     const filterCourse = courseData.filter(c => c._id !== courseId)
      //     dispatch(setCourseData(filterCourse))
      // }


      if (updateData.isPublished) {
  let updateCourses;

  if (courseData.some(c => c._id === courseId)) {
    // Replace existing course
    updateCourses = courseData.map(c =>
      c._id === courseId ? updateData : c
    );
  } else {
    // If not in list, add it
    updateCourses = [...courseData, updateData];
  }

  dispatch(setCourseData(updateCourses));
} else {
  // Remove course if unpublished
  const filterCourse = courseData.filter(c => c._id !== courseId);
  dispatch(setCourseData(filterCourse));
}


      setLoading(false)
      toast.success("Course Edited Successfully")
      navigate("/courses")

    } catch (error) {
      console.log(error);
      setLoading(false)
      toast.error("Something went wrong")
      
    }
  }
 
  const handleRemoveCourse = async () => {
      setLoading1(true)
      try {
        const result = await axios.delete(serverUrl + `/api/course/remove/${courseId}`,{withCredentials: true})
        console.log(result.data);
        const filterCourse = courseData.filter(c => c._id !== courseId)
        dispatch(setCourseData(filterCourse))
        setLoading1(false)
        toast.success("Course removed successfully ")
        navigate("/courses")
        
      } catch (error) {
        console.log(error);
        setLoading1(false)
        toast.error(error.response.data.message)
        
      }
  }




  
  
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md ">
      {/* {top bar} */}
      <div className="flex items-center justify-center gap-[20px] relative flex-col md:flex-row md:items-center md:justify-between  mb-6">
        <FaArrowLeftLong
          className="w-[22px] h-[22px] cursor-pointer top-[-20%] md:top-[20%] absolute left-[0] md:left-[2%]"
          onClick={() => navigate("/courses")}
        />

        <h2 className="text-2xl font-semibold md:pl-[60px]">
          Add Detail Information regarding the Course
        </h2>
        <div className="space-x-2 space-y-2">
          <button className="bg-black text-white px-4 py-2 rounded-md cursor-pointer " onClick={() => navigate(`/createlecture/${selectCourse?._id}`)} >
            Go to Lecture page{" "}
          </button>
        </div>
      </div>

      {/* {form details} */}
      <div className="bg-gray-50 p-6 rounded-md">
        <h2 className="text-lg font-medium mb-4">Basic Course Information</h2>
        <div className="space-x-2 space-y-2">
          {!isPublished ? (
            <button
              className="bg-green-100 text-green-600 px-4 py-2 rounded-md border-1 "
              onClick={() => setIsPublished((prev) => !prev)}
            >
              Click to Publish
            </button>
          ) : (
            <button
              className="bg-red-100 text-red-600 px-4 py-2 rounded-md border-1 "
              onClick={() => setIsPublished((prev) => !prev)}
            >
              Click to UnPublish
            </button>
          )}

          <button className="text-white bg-red-600 px-4 py-2 rounded-md border-1 "
          onClick={handleRemoveCourse}>
            Remove Course
          </button>
        </div>

        <form onSubmit={(e)=>e.preventDefault()} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor=""
            >
              Title
            </label>
            <input
              className="w-full border px-4 py-2 rounded-md "
              placeholder="CourseTitle"
              type="text"
              onChange={(e)=>setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor=""
            >
              Subtitle
            </label>
            <input
              className="w-full border px-4 py-2 rounded-md "
              placeholder="CourseSubtitle"
              type="text"
              onChange={(e)=>setSubTitle(e.target.value)}
              value={subTitle}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor=""
            >
              Description
            </label>
            <textarea
              className="w-full border px-4 py-2 rounded-md h-24 resize-none "
              placeholder="CourseDescription"
              type="text"
              onChange={(e)=>setDescription(e.target.value)}
              value={description}
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space:y-4 sm:space-y-0">
            {/* for category */}
            <div className="flex-1">
              <label
                className="text-gray-700 block text-sm font-medium mb-1 "
                htmlFor="cat"
              >
                Course Category
              </label>
              <select
                id="cat"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                placeholder="Enter Your category"
                className="w-full border bg-white rounded-md px-4 py-2  "
              >
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
            {/* for level */}
            <div className="flex-1">
              <label
                className="text-gray-700 block text-sm font-medium mb-1 "
                htmlFor="cat"
              >
                Course Level
              </label>
              <select
                id="cat"
                onChange={(e) => setLevel(e.target.value)}
                value={level}
                placeholder="Enter Your category"
                className="w-full border bg-white rounded-md px-4 py-2  "
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            {/* for price */}
            <div>
              <label
                className="text-gray-700 block text-sm font-medium mb-1 "
                htmlFor="cat"
              >
                Course Price
              </label>
              <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                placeholder="₹ : 0000"
                id="price"
                className="w-full border bg-white rounded-md px-4 py-2 "
              />

            </div>
           
           
          </div>

           <div>
              <label  className="text-gray-700 block text-sm font-medium mb-1 " htmlFor="">Course Thumbnail</label>
              <input type="file" hidden ref={thumb} accept="image" onChange={handleThumbnail} />
            </div>

           <div className="relative w-[300px] h-[170px] ">
              <img src={frontendImage}  alt="" className="w-[100%] h-[100%] border-1 object-contain border-black rounded-[5px] " onClick={()=>thumb.current.click()} />
              <FaEdit className="absolute top-2 right-2 w-[20px] h-[20px] text-white bg-black rounded-full p-1 cursor-pointer" onClick={()=>thumb.current.click()} />
            </div>

            <div className="space-x-4">

              
              <button className="bg-[#e9e8e8] hover:bg-red-200 text-black border-1 border-black cursor-pointer px-4 py-2 rounded-md " onClick={() => navigate("/courses")} >Cancel</button>


              <button  className=" text-white border-1 border-black cursor-pointer px-6 py-2 rounded-md  bg-black hover:bg-green-300 " onClick={handleEditCourse}>{loading? <ClipLoader color="white" size={30} /> :"Save"}</button>


            </div>
          
        </form>
      </div>
    </div>
  );
};

export default EditCourses;


