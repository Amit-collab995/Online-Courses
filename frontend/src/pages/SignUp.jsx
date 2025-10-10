import React from "react";
import logo from "../assets/logo.jpg";
import google from "../assets/google.jpg";
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import {ClipLoader} from "react-spinners"
import { useDispatch } from "react-redux";
// import { setUserData } from '../redux/userSlice';
import { setUserData } from "../redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebase";




const SignUp = () => {
    const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    setLoading(true)
     try {
        const result = await axios.post(serverUrl + "/api/auth/signup", {
            name, email, password, role
        }, {withCredentials: true})
        dispatch(setUserData(result.data))
        setLoading(false)
        navigate("/")
        toast.success("Signup successful!")

     } catch (error) {
        toast.error(error.response.data.message)
     }
  }

const googleSignUp = async () => {
  try {
    const response = await signInWithPopup(auth, provider)
    let user = response.user
    let name = user.displayName
    let email = user.email
    const result = await axios.post(serverUrl + "/api/auth/googleauth", {name, email, role, }, {withCredentials:true})
    dispatch(setUserData(result.data))
    navigate("/")
    toast.success("Sign Successfully")
    
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message)
  }
}

  return (
    <div className="bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center ">
      <form onSubmit={(e) => { e.preventDefault();}} className="w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-xl flex ">
        {/*left div */}
        <div className="md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-black ">
              let's get started
            </h1>
            <h2 className="text-[18px] text-[#999797] ">Create your account</h2>
          </div>

          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="name" className="font-semibold ">
              Name
            </label>
            <input
              id="name"
              className="border-1 w-[100%] border-[#e7e6e6] text-[15px] px-[20px] "
              placeholder="Your name"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="email" className="font-semibold ">
              Email
            </label>
            <input
              id="email"
              className="border-1 w-[100%] border-[#e7e6e6] text-[15px] px-[20px] "
              placeholder="Your email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex relative flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="password" className="font-semibold ">
              Password
            </label>
            <input
              id="password"
              className="border-1 w-[100%] border-[#e7e6e6] text-[15px] px-[20px] "
              placeholder="Your password"
              type={show ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <IoEyeOutline
              className="absolute right-4 top-3/4 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShow(!show)}
            />
            <IoEye
              className={`absolute right-4 top-3/4 transform -translate-y-1/2 cursor-pointer ${
                show ? "block" : "hidden"
              }`}
              onClick={() => setShow(!show)}
            />
          </div>

          <div className="flex md:w-[50%]  w-[70%] items-center justify-center gap-1 ">
            <span className={`px-[10px] py[5px] border-[2px] border-[#e7e6e6] rounded-2xl cursor-pointer hover:border-black ${role === "student" ? "border-black" : "border-[#646464]"}`} onClick={() => setRole("student")}>
              Student
            </span>
            <span className={`hover:border-black px-[10px] py[5px] border-[2px] border-[#e7e6e6] rounded-2xl cursor-pointer ${role === "educator" ? "border-black" : "border-[#646464]"}`} onClick={() => setRole("educator")}>
              Educator
            </span>
          </div>
          <button onClick={handleSignup} className="w-[80%] h-[40px] cursor-pointer bg-black text-white px-4 py-2 rounded-xl flex items-center justify-center ">
            {loading ? <ClipLoader /> : "Sign Up"}
          </button>

          <div className="w-[80%] flex items-center justify-center ">
            <div className="w-[25%] h-[0.5px]  bg-[#c4c4c4] "></div>
            <div className="w-[40%] text-center">Or continue</div>
            <div className="w-[25%] h-[0.5px]  bg-[#c4c4c4] "></div>
          </div>

          <div className="w-[80%]  h-[40px] border-1 border-black rounded-[5px] flex items-center justify-center cursor-pointer " onClick={googleSignUp}>
            <img  src={google} className="w-[25px] " alt="" />
            <span className="text-[23px] text-gray-500 ">oogle</span>
          </div>

          <div className="text-[#6f6f6f]"> Already have account ? <span className="text-black cursor-pointer" onClick={() => navigate('/login')}>Login</span></div>

        </div>

        {/*right div */}
        <div className="w-[50%]  h-[100%] rounded-r-2xl bg-black md:flex flex-col items-center justify-center hidden">
          <img src={logo} className="w-30 shadow-2xl " alt="" />
          <span className="text-white text-2xl">VIRTUAL COURES</span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
