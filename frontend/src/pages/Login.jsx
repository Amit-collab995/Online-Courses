import React from "react";
import { useState } from "react";
import logo from "../assets/logo.jpg";
import google from "../assets/google.jpg";
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebase";
import { FaArrowLeftLong } from 'react-icons/fa6'

const Login = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setLoading(false);
      dispatch(setUserData(result.data));
      navigate("/");
      toast.success("Login successful!");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const googleLogin = async () => {
  try {
    const response = await signInWithPopup(auth, provider)
    let user = response.user
    let name = user.displayName
    let email = user.email
    let role = user.role || "";

    const result = await axios.post(serverUrl + "/api/auth/googleauth", {name, email, role, }, {withCredentials:true})
    dispatch(setUserData(result.data))
    navigate("/")
    toast.success("Login Successfully")
    
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message)
  }
}
  return (
    <div className="bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center ">
      <form
       
        onSubmit={(e) => {
          e.preventDefault();
        }}
        
        className="w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-xl flex "
        
      >
        {/*left div */}
        <div className="md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3">
          
          <div className="relative">
            <h1 className="text-2xl font-semibold text-black ">
            <FaArrowLeftLong className='absolute top-[10%] left-[-50%] w-[22px] h-[22px] cursor-pointer  ' onClick={()=>navigate("/")} />
              let's get started
            </h1>
            <h2 className="text-[18px] text-[#999797] ">Enter your account</h2>
          </div>

          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="email" className="font-semibold ">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              className="border-1 w-[100%] border-[#e7e6e6] text-[15px] px-[20px] "
              placeholder="Your email"
              type="email"
            />
          </div>

          <div className="flex relative flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="password" className="font-semibold ">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="password"
              className="border-1 w-[100%] border-[#e7e6e6] text-[15px] px-[20px] "
              placeholder="Your password"
              type={show ? "text" : "password"}
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

          <button
            onClick={handleLogin}
            className="w-[80%] h-[40px] cursor-pointer bg-black text-white px-4 py-2 rounded-xl flex items-center justify-center "
            disabled={loading}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Login"}
          </button>

          <span
            className="text-[15px] cursor-pointer"
            onClick={() => navigate("/forget-password")}
          >
            Forget Your Password
          </span>

          <div className="w-[80%] flex items-center justify-center ">
            <div className="w-[25%] h-[0.5px]  bg-[#c4c4c4] "></div>
            <div className="w-[40%] text-center">Or continue</div>
            <div className="w-[25%] h-[0.5px]  bg-[#c4c4c4] "></div>
          </div>

          <div className="w-[80%]  h-[40px] border-1 border-black rounded-[5px] flex items-center justify-center cursor-pointer " onClick={googleLogin} >
            <img src={google} className="w-[25px] " alt="" />
            <span className="text-[23px] text-gray-500 ">oogle</span>
          </div>
          <div className="text-[#6f6f6f]">
            {" "}
            Create an account ?{" "}
            <span
              className="text-black cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              SignUp
            </span>
          </div>
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

export default Login;
