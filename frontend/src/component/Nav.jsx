import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { IoPersonCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RxHamburgerMenu } from "react-icons/rx";

import { GiCrossMark } from "react-icons/gi";

const Nav = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showHam, setShowHam] = useState(false);

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      console.log(result.data);
      toast.success("Logout successful!");

      dispatch(setUserData(null));
    } catch (error) {
      toast.error("Logout failed!");
      console.log(error);
    }
  };
  return (
    <div>
      <div className="w-[100%]  h-[70px] fixed top-0 px-[20px] bg-gray-700 py-[10px] flex items-center justify-between   ">
        <div className="lg:w-[20%] w-[40%] lg:pl-[50px]  ">
          <img
            className="rounded-[5px] w-[60px]  border-white  border-2 object-contain"
            src={logo}
            alt="logo"
          />
        </div>
        <div className="w-[30%] lg:flex items-center justify-center gap-4 hidden ">
          {!userData && (
            <IoPersonCircle
              onClick={() => setShow((prev) => !prev)}
              className="h-[50px]  cursor-pointer  fill-black w-[50px]"
            />
          )}

          {userData?.photoUrl ? <img onClick={() => setShow((prev) => !prev)} src={userData.photoUrl} className="w-[40px] h-[40px] rounded-full text-white bg-black flex items-center justify-center text-[20px] font-semibold cursor-pointer border-2 border-white " /> : (
            <div
              className="w-[40px] h-[40px] rounded-full text-white bg-black flex items-center justify-center text-[20px] font-semibold cursor-pointer border-2 border-white "
              onClick={() => setShow((prev) => !prev)}
            >
              {userData?.name.slice(0, 1).toUpperCase()}
            </div>
          )}

          {userData?.role === "educator" ? (
            <div  className="px-[15px] py-[5px] border-2 cursor-pointer border-white text-white bg-black rounded-xl text-[18px] font-light flex gap-2" onClick={()=>navigate("/dashboard")}>
              Dashboard
            </div>
          ) : null}
          {!userData ? (
            <span
              className="px-[15px] py-[5px] border-2 cursor-pointer  border-white text-white bg-black rounded-xl text-[18px] font-light flex gap-2"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          ) : (
            <span
              className="px-[15px] py-[5px] border-2 cursor-pointer border-white text-white bg-black rounded-xl text-[18px] font-light flex gap-2"
              onClick={handleLogout}
            >
              Logout
            </span>
          )}

          {show && (
            <div className="absolute right-[15%] top-[110%] flex flex-col items-center justify-center gap-2 text-[16px] rounded-md bg-white px-[15px] py-[10px] border-2 border-black hover:border-white hover:text-white cursor-pointer hover:bg-black ">
              <span className="bg-black cursor-pointer text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600  " onClick={() => navigate("/profile")}>
                My Profile
              </span>
              <span className="bg-black cursor-pointer text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600  " onClick={()=>navigate("/mycourses")} >
                My Courses
              </span>
            </div>
          )}
        </div>
        <RxHamburgerMenu
          className="h-[40px]    cursor-pointer lg:hidden fill-black w-[50px] hover:text-red-600"
          onClick={() => setShowHam((prev) => !prev)}
        />
        <div
          className={`fixed   top-0 right-0 w-[100vw] h-[100vh]   bg-black flex items-center opacity-70   justify-center flex-col gap-5 z-[9999] lg:hidden ${
            showHam
              ? "translate-x-0 transition-transform duration-600"
              : "translate-x-full transition-transform duration-600"
          }`}
        >
          <GiCrossMark
            className="w-[35px] h-[35px] text-white absolute top-5 right-7 hover:text-red-600 cursor-pointer z-20"
            onClick={() => setShowHam((prev) => !prev)}
          />

          {!userData && (
            <IoPersonCircle className="h-[50px]  cursor-pointer  fill-black w-[50px]" />
          )}

          {userData?.photoUrl ? <img src={userData.photoUrl} className="w-[64px] h-[64px]  rounded-full text-white bg-black flex items-center justify-center text-[20px] font-semibold cursor-pointer border-2 border-green-400 " /> : (
            <div className="w-[50px] h-[50px] rounded-full text-white border-2 border-white bg-black flex items-center justify-center text-[20px] font-semibold cursor-pointer ">
              {userData?.name.slice(0, 1).toUpperCase()}
            </div>
          )}

          <div className="bg-black border-2 cursor-pointer text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600 text-center w-[180px]" onClick={() => navigate("/profile")}>
            My Profile
          </div>

          <div className="bg-black border-2 cursor-pointer text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600 text-center w-[180px]" onClick={()=>navigate("/mycourses")} >
            My Courses
          </div>

          {userData?.role === "educator" && (
            <div className="bg-black border-2 cursor-pointer text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600 text-center w-[180px]" onClick={()=>navigate("/dashboard")} >
              Dashboard
            </div>
          )}

          {!userData ? (
            <span
              className="bg-black border-2 cursor-pointer text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600 text-center w-[180px]"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          ) : (
            <span
              className="bg-black border-2 text-center cursor-pointer w-[180px] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600  "
              onClick={handleLogout}
            >
              Logout
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
