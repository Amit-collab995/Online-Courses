import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import getCurrentUser from "./customHooks/getCurrentUser";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/ForgetPassword";
import EditProfile from "./pages/EditProfile";
import Dashboard from "./pages/Eductor/Dashboard";
import Courses from "./pages/Eductor/Courses";
import CreateCourses from "./pages/Eductor/CreateCourses";
import getCreatorCourse from "./customHooks/getCreatorCourse";
import EditCourses from "./pages/Eductor/EditCourses";
import getPublishedCourse from "./customHooks/getPublishedCourse";
import AllCourses from "./pages/AllCourses";
import CreateLecture from "./pages/Eductor/CreateLecture";
import EditLecture from "./pages/Eductor/EditLecture";
import ViewCourses from "./pages/ViewCourses";
import ScroolToTop from "./component/ScroolToTop";
import ViewLeactures from "./pages/ViewLeactures";
import MyEnrolledCourses from "./pages/MyEnrolledCourses";
import getAllReviews from "./customHooks/getAllReviews";
import SearchWithAi from "./pages/SearchWithAi";

export const serverUrl = "https://virtualcourses-12.onrender.com";

const App = () => {
  getCurrentUser();
  getCreatorCourse()
  getPublishedCourse()
  ScroolToTop()
  getAllReviews()
  const { userData } = useSelector((state) => state.user);
  

  return (
    <>
      <ToastContainer />
      <ScroolToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={userData ? <Profile /> : <Navigate to={"/signup"} />}
        />

        <Route path="/forget-password" element={userData ? <ForgetPassword />: <Navigate to={"/signup"}/>} />

        <Route path="/edit-profile" element={userData ? <EditProfile />: <Navigate to={"/signup"}/>} />

        <Route path="/allcourses" element={userData ? <AllCourses />: <Navigate to={"/signup"}/>} />

        <Route path="/dashboard" element={userData?.role === "educator" ? <Dashboard />: <Navigate to={"/signup"}/>} />

        <Route path="/courses" element={userData?.role === "educator" ? <Courses />: <Navigate to={"/signup"}/>} />

        <Route path="/createcourse" element={userData?.role === "educator" ? <CreateCourses/>: <Navigate to={"/signup"}/>} />

        <Route path="/editcourse/:courseId" element={userData?.role === "educator" ? <EditCourses/>: <Navigate to={"/signup"}/>} />

         <Route path="/createlecture/:courseId" element={userData?.role === "educator" ? <CreateLecture/>: <Navigate to={"/signup"}/>} />

         <Route path="/editlecture/:courseId/:lectureId" element={userData?.role === "educator" ? <EditLecture/>: <Navigate to={"/signup"}/>} />

          <Route path="/viewcourse/:courseId" element={userData ? <ViewCourses/>: <Navigate to={"/signup"}/>} />

          <Route path="/viewlecture/:courseId" element={userData ? <ViewLeactures/>: <Navigate to={"/signup"}/>} />

          <Route path="/mycourses" element={userData ? <MyEnrolledCourses/>: <Navigate to={"/signup"}/>} />

          <Route path="/search" element={userData ? <SearchWithAi/>: <Navigate to={"/signup"}/>} />


      </Routes>
    </>
  );
};

export default App;
