import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { serverUrl } from '../App';

const ForgetPassword = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    // step 1: enter email and send otp
    const sendOtp = async() => {
        setLoading(true);
        // api call
        try {
            const result = await axios.post(serverUrl + "/api/auth/send-otp", {email}, {withCredentials: true});

            console.log(result.data);
             setLoading(false);
            setStep(2);
            toast.success("OTP sent to your email");
            
            
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            setLoading(false);
            
        }
    }

    //step2 

    const verifyOTP = async (req, res) => {
        setLoading(true)
        try {
            const result = await axios.post(serverUrl + "/api/auth/verify-otp", {email, otp}, {withCredentials: true})
            console.log(result.data);
            setLoading(false)
            setStep(3)
            toast.success(result.data.message)
            
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            setLoading(false)
            
            
        }
    }
    
    //step 3


    const resetPassword = async () => {
        setLoading(true);
        try {
            if (newPassword !== confirmPassword) {
                return toast.error("password is not matched")
            }
            const result = await axios.post(serverUrl + "/api/auth/reset-password", {email, password:newPassword}, {withCredentials:true})
            console.log(result.data);
            setLoading(false)
            navigate("/login")
            toast.success(result.data.message)
            
        } catch (error) {
            // console.log(error);
            toast.error(error.response.data.message)
            setLoading(false)
            
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
        {step === 1 && (
            <div className='flex flex-col gap-4 bg-white p-6 rounded-md shadow-md w-full max-w-md   '>
                <h1 className='text-2xl font-semibold text-center'>Forget Password</h1>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className='flex flex-col gap-2 mt-4'>
                    <label htmlFor="email">Enter Your Email</label>
                   <input required type='email' 
                   onChange={(e) => setEmail(e.target.value)} value={email}  id="email"
                   placeholder='your@email.com' className='border p-2 rounded-md' />
                <button disabled={loading} className='bg-blue-500 hover:bg-gray-300 hover:text-black text-white p-2 rounded-md'onClick={sendOtp}>{loading ? <ClipLoader/> : "Send OTP"}</button>
                </div>
                </form>
                <div className='text-sm cursor-pointer text-center mt-4 ' onClick={() => navigate("/login")}>Back to Login</div>

            </div>
        )}
        {step === 2 && (
             <div className='flex flex-col gap-4 bg-white p-6 rounded-md shadow-md w-full max-w-md   '>
                <h1 className='text-2xl font-semibold text-center'>Enter Your OTP</h1>
                
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className='flex flex-col gap-2 mt-4'>
                    <label htmlFor="otp">Please enter your four digit code.</label>
                   <input required type='text' 
                   onChange={(e) => setOtp(e.target.value)} value={otp}  id="otp"
                   placeholder='****' className='border p-2 rounded-md' />
                <button onClick={verifyOTP} className='bg-blue-500 hover:bg-gray-300 hover:text-black text-white p-2 rounded-md' disabled={loading}>{loading ? <ClipLoader/> : "Verify OTP"}</button>
                </div>
                </form>
                <div className='text-sm cursor-pointer text-center mt-4 ' onClick={() => navigate("/login")}>Back to Login</div>

            </div>
        )}
        {step === 3 && (
            <div className='flex flex-col gap-4 bg-white p-6 rounded-md shadow-md w-full max-w-md   '>
                <h1 className='text-2xl font-semibold text-center'>Reset Your Password</h1>
                <p className=' text-center  text-purple-600'>Enter your new password.</p>
                <form onSubmit={(e) => e.preventDefault()} className='space-y-1 flex flex-col'>
                   <div className='flex flex-col gap-1'>
                     <label htmlFor="new-password">New Password</label>
                    <input id="new-password" 
                    onChange={(e) => setNewPassword(e.target.value)} value={newPassword}
                    type='password' placeholder='********' className='border p-2 rounded-md' />
                   </div>
                   <div className='flex flex-col gap-1'>
                     <label htmlFor="confirm-password">Confirm Password</label>
                    <input id="confirm-password"  
                    onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}
                    type='password' placeholder='********' className='border p-2 rounded-md' />
                   </div>
                </form>
                <button onClick={resetPassword} 
                disabled={loading}
                className='bg-blue-500 hover:bg-gray-300 hover:text-black text-white p-2 rounded-md'>{loading? <ClipLoader/> : "Reset Password"}</button>
            </div>
        )}
    </div>
  )
}

export default ForgetPassword