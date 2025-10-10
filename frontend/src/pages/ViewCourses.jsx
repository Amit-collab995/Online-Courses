import React, { useEffect, useState } from "react";
import { FaArrowLeftLong, FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setSelectedCourse } from "../redux/courseSlice";
import img from "../assets/empty.jpg";
import { FaLock } from "react-icons/fa";
import { FaRegPlayCircle } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../App";
import Card from "../component/Card";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const ViewCourses = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { courseData, selectedCourse } = useSelector((state) => state.course);
  const {userData} = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const[selectedLecture, setSelectedLecture] = useState(null);
  const [creatorData, setCreatorData] = useState(null)
  const[creatorCourses, setCreatorCourses] = useState(null)
  const [isEnrolled , setIsEnrolled] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)


  const fetchCourseData = () => {
    courseData.forEach((course) => {
      if (course._id === courseId) {
        dispatch(setSelectedCourse(course));
      }
    });
  };


  useEffect(()=> {
  const handleCreator = async () => {
    if (selectedCourse?.creator) {
      try {
        const result = await axios.post(
          serverUrl + "/api/course/creator", 
          { userId: selectedCourse?.creator }, 
          { withCredentials: true }
        )
        console.log(result.data);
        setCreatorData(result.data)
      } catch (error) {
        console.error("Creator fetch error:", error);
      }
    }
  };

  handleCreator();   //  function call hoga
}, [selectedCourse]);  //  jab selectedCourse 
 

const checkEnrollment = () => {
  const verify = userData?.enrollCourses?.some(
    c => (typeof c === 'string' ? c : c._id).toString() === courseId?.toString()
  )
  if (verify) {
    setIsEnrolled(true)

  }
}




  useEffect(() => {
    fetchCourseData();
    checkEnrollment();
  }, [courseData, courseId, userData]);

  useEffect(()=>{
    if (creatorData?._id && courseData.length > 0) {
      const creatorCourse = courseData.filter((course)=> course.creator === creatorData?._id && course._id !== courseId)
      setCreatorCourses(creatorCourse)
    }
    
  },[creatorData, courseData])

  const handleEnroll = async (userId, courseId) => {
    try {
      const orderData = await axios.post(serverUrl + "/api/order/razorpay-order", {userId, courseId}, {withCredentials: true})
      console.log(orderData);
      
      const options = {
        key:   import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.data.amount,
        currency: 'INR',
        name: "VIRTUAL COURSES",
        description: "COURSE ENROLLMENT PAYMENT",
        order_id: orderData.data.id,
        handler : async function (response) {
          console.log("RazorPay Response", response);
          
        try {
          const verifyPayment = await axios.post(serverUrl + "/api/order/verifypayment",{ 
            ...response,
            courseId,
            userId
          }, {withCredentials: true})
          setIsEnrolled(true)
          toast.success(verifyPayment.data.message)          
        } catch (error) {
          console.log(error);
          
          toast.error(error.response.data.message)
        }

      }

     }
      const rzp = new window.Razorpay(options)
      rzp.open()
       
      
    } catch (error) {
      console.log(error);
       toast.error("Something went wrong while enrolling.")
      
    }
  }


  const handleReview = async ()=>{


    console.log("Data sent to backend:", { rating, comment, courseId });

    setLoading(true)

    try {
      const result = await axios.post(serverUrl + "/api/review/createreview", { rating, comment, courseId }, { withCredentials: true });

      setLoading(false)
      toast.success("Review submitted successfully")
      console.log(result.data);
      setRating(0)
      setComment("")
      
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message)
      console.log(error);
      setRating(0)
      setComment("")
    }
  }


const calculateAvgReview = (reviews) => {
  if(!reviews || reviews.length === 0){
    return 0
  }
  const total = reviews.reduce((sum, review) => sum + review.rating, 0)
  return (total / reviews.length).toFixed(1)
}

const avgRating = calculateAvgReview(selectedCourse?.reviews)






  

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-4 sm:p-6 space-y-6">
        {/* top section */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* thumbnail */}
          <div className="w-full md:w-1/2">
            <FaArrowLeftLong
              className="text-black w-6 h-6 cursor-pointer mb-4"
              onClick={() => navigate("/")}
            />

            {selectedCourse?.thumbnail ? (
              <img
                src={selectedCourse?.thumbnail}
                alt="course thumbnail"
                className="w-full h-64 sm:h-80 object-cover rounded-lg"
              />
            ) : (
              <img
                src={img}
                alt="default"
                className="w-full h-64 sm:h-80 object-cover rounded-lg"
              />
            )}
          </div>

          {/* course Info */}
          <div className="flex-1 space-y-3 mt-2 md:mt-6">
            <h2 className="text-xl sm:text-2xl font-bold">{selectedCourse?.title}</h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {selectedCourse?.subTitle}
            </p>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-yellow-500 font-medium">
                <span className="flex items-center gap-2"><FaStar className="text-yellow-300" /> {avgRating}</span>
                <span className="text-gray-500 text-sm">(1200 Reviews)</span>
              </div>

              <div>
                <span className="text-lg sm:text-xl font-semibold text-black">
                  ₹ {selectedCourse?.price}
                </span>
                <span className="line-through text-sm text-gray-400 ml-2">
                  ₹ 2200
                </span>
              </div>

              <ul className="text-sm sm:text-base text-gray-700 space-y-1 pt-2">
                <li className="font-semibold">✅ 10+ hours of video content</li>
                <li className="font-semibold">✅ Lifetime access to course</li>
              </ul>

             {!isEnrolled ?  <button className="bg-black text-white cursor-pointer hover:bg-gray-700 px-4 sm:px-6 py-2 mt-3 rounded-lg text-sm sm:text-base" onClick={()=> handleEnroll(userData._id, courseId)}>
                Enroll Now
              </button> :  <button className="bg-green-100 text-green-600 cursor-pointer hover:bg-gray-700 px-4 sm:px-6 py-2 mt-3 rounded-lg text-sm sm:text-base" onClick={()=>navigate(`/viewlecture/${courseId}`)}  >
                Watch Now
              </button>}


              
            </div>
          </div>
        </div>

        {/* what you will learn */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-2">
            What you will Learn
          </h2>
          <ul className="list-disc pl-5 sm:pl-6 text-gray-700 text-sm sm:text-base">
            <li>{selectedCourse?.category} from Beginning</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 ">Who This Course is For</h2>
          <p className="text-gray-700">Beginners, aspiring developers, and professionals looking to upgrade skills.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-white w-full md:w-2/5 p-6 rounded-2xl shadow-lg border border-gray-200 ">
          <h2 className="text-xl font-bold mb-1 text-gray-800 ">Course Curriculum</h2>
          <p className="text-sm text-gray-500 mb-4 ">
            {selectedCourse?.lectures?.length} Lectures
          </p>

          <div className="flex flex-col gap-3">
               {selectedCourse?.lectures?.map((lecture, index) => (

                <button key={index} 
                disabled={!lecture.isPreviewFree}
                onClick={()=> {if (lecture.isPreviewFree) {
                  setSelectedLecture(lecture)
                  
                }}} className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 text-left ${lecture.isPreviewFree? "hover:bg-gray-100 cursor-pointer border-gray-300": "cursor-not-allowed opacity-60 border-gray-200 " } ${selectedLecture?.lectureTitle === lecture?.lectureTitle ? "bg-gray-100 border-gray-400" : "bg-gray-100 border-gray-400"}  `}>

                  <span className="text-lg text-gray-700">
                    {lecture.isPreviewFree ? <FaRegPlayCircle /> : <FaLock />}
                  </span>
                  <span className="text-lg text-gray-700">{lecture.lectureTitle}</span>

                  </button>

               ))}

               
          </div>

          </div>
          <div className="bg-white w-full md:w-3/5 p-6 rounded-2xl shadow-lg border border-gray-200 ">
            <div className="aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black flex items-center justify-center">
              {selectedLecture?.videoUrl ? <video   controls src={selectedLecture?.videoUrl} className="w-full object-cover h-full"  /> : <span >Select a preview lecture to watch</span>}

            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">
            Write a Reviews
          </h2>
          <div className="mb-4">
          
            <div className="flex gap-1 mb-2">
              {
                [1,2,3,4,5].map((star)=>(
                  <FaStar 
                  onClick={()=> setRating(star)} 
                  key={star} className={star <= rating ? "fill-amber-300" : "fill-gray-300"} />
                ))
              }
            </div>
              
              <textarea
              onChange={(e)=> setComment(e.target.value)} 
              value={comment}
              className="w-full border border-gray-300 rounded-lg p-2" placeholder="Write your review here" />

               <button 
               onClick={handleReview}
              disabled={loading} 
              className="bg-black text-white cursor-pointer hover:bg-gray-700 px-4 sm:px-6 py-2 mt-3 rounded-lg text-sm sm:text-base">
                {loading ? <ClipLoader size={30} color="white" /> : "Submit Review"}
              </button>

          </div>
        </div>
          
          {/* for creator information */}
          <div className="flex items-center gap-4 pt-4 border-t">
            {creatorData?.photoUrl?  <img src={creatorData?.photoUrl} alt="" className="w-16 h-16 border-3 border-green-600  rounded-full object-cover " /> : <img src={img} alt="" className="w-16 h-16  rounded-full object-cover " />}

            <div>
              <h2 className="text-lg font-semibold">{creatorData?.name}</h2>
              <p className="md:text-sm font-semibold text-gray-600 text-[10px]">{creatorData?.description}</p>
              <p className="md:text-sm font-semibold text-gray-600 text-[10px]">{creatorData?.email}</p>
            </div>
            
          </div>

          <div>
            <p className="text-xl font-semibold mb-2">Other Published Courses by the Educator</p>
          </div>

          <div className="w-full transition-all duration-300 py-[20px] flex items-center justify-center lg:justify-start flex-wrap gap-6 lg:px-[80px] ">
             {
              creatorCourses?.map((course,index )=>(
                <Card
            course={course}
            key={index}
            id={course._id}
            thumbnail={course.thumbnail}
            title={course.title}
            category={course.category}
            price={course.price}
          />
              ))  
             }
          </div>


      </div>
    </div>
  );
};

export default ViewCourses;




