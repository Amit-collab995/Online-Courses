import React from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {FaArrowLeftLong} from "react-icons/fa6"
import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const {creatorCourseData} = useSelector((state) => state.course);

  const CourseProgressData = creatorCourseData?.map((course) =>({
    name: course?.title.slice(0.10) + "...",
    lectures: course.lectures.length || 0
  })) || [];

  const EnrollData  = creatorCourseData?.map((course) =>({
    name: course.title?.slice(0.10) + "...",
    enrolled: course.enrolledStudents.length || 0
  })) || [];


  const totalEarning = creatorCourseData?.reduce((sum, course) => {
    const studentCount = course.enrolledStudents.length || 0;
    const courseRevenue = course.price ? course.price * studentCount : 0;

    return sum + courseRevenue;
  }, 0) || 0


  return (
    <div className="flex min-h-screen bg-gray-100 ">
      
      <div className="w-full px-6 py-10 bg-gray-50 space-y-10 ">
        <FaArrowLeftLong className="text-4xl ml-5 cursor-pointer" onClick={() => navigate("/")} />
        {/* main section */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
          {userData?.photoUrl ? (
            <img
              src={userData.photoUrl}
              alt="Educator"
              className="w-24 h-24 rounded-full object-cover border-4 border-black shadow-md"
            />
          ) : (
            <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gray-200 text-black text-4xl font-bold border-4 border-black shadow-md">
              {userData?.name?.slice(0, 1).toUpperCase()}
            </div>
          )}
          <div className="text-center md:text-left space-y-1">
            <h1 className="text-2xl font-bold text-gray-800  ">Wellcome , {userData?.name || "Educator"}🤚</h1>
            <h1 className="text-xl font-bold text-gray-800">Total Earning : ₹ {totalEarning.toLocaleString()}</h1>
            <p className="text-gray-600 text-sm">{userData?.description || "Start Creating Course for your Student's"}</p>
            <h1 className="px-4 py-2 flex justify-center items-center bg-black text-white rounded-md cursor-pointer" onClick={() => navigate("/courses")}>Create Courses</h1>
          </div>
        </div>

        {/* graph Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Course Progress (Lectures)</h2>
             <ResponsiveContainer width="100%" height={300}>
              <BarChart data={CourseProgressData}>

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                
                <Tooltip />
                <Bar dataKey="lectures" fill="black" radius={[5,5,0,0] } />

               

              </BarChart>
             </ResponsiveContainer>
          </div>
          
           {/* Enroll Data  */}

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Students Enrollment</h2>
             <ResponsiveContainer width="100%" height={300}>
              <BarChart data={EnrollData}>

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                
                <Tooltip />
                <Bar  dataKey="enrolled" fill="black" radius={[5,5,0,0] } />
              </BarChart>
             </ResponsiveContainer>
          </div>


        </div>

      </div>

    </div>
  );
};

export default Dashboard;
