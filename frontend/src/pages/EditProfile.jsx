import axios from 'axios'
import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'

const EditProfile = () => {
  const navigate = useNavigate()
  const { userData } = useSelector(state => state.user)
  const [name, setName] = useState(userData.name || "")
  const [description, setDescription ] = useState(userData.description || "")
  const [photoUrl , setPhotoUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  


  const handleEditProfile = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("photoUrl", photoUrl)

      const result = await axios.put(serverUrl + "/api/user/profile", formData, {withCredentials:true} )
      dispatch(setUserData(result.data))
      setLoading(false)
      navigate("/")
      toast.success("Profile Updated Successfully")
    } catch (error) {
      setLoading(false)
      console.log(error);
      toast.error("Profile Update Failed")
      
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10'>
      <div className='bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative '>

        <FaArrowLeft className='absolute top-4 left-4 text-black cursor-pointer' onClick={() => navigate("/profile")} />
        <h2 className='text-center font-bold p-4 text-2xl'>Edit Profile</h2>
        <form onSubmit={(e)=>e.preventDefault()} action="" className='space-y-5'>
          <div className='flex flex-col items-center justify-center'>
            {userData?.photoUrl ? <img src={userData?.photoUrl} className='w-24 h-24 rounded-full object-cover border-4 border-green-400' alt="" /> :
              <div className='w-18 h-18 rounded-full object-cover text-[30px]  text-white bg-black border-4 border-red-500 flex items-center justify-center'>
                {userData?.name.slice(0, 1).toUpperCase()}
              </div>
            }
          </div>

          <div className=''>
            <label className='text-sm font-medium text-gray-700' htmlFor="image">Select Avator</label>
            <input name='photoUrl' className='w-full px-4 py-2 border rounded-md text-sm ' placeholder='photoUrl' accept='image/*' id='image' type="file" 
            onChange={(e)=>setPhotoUrl(e.target.files[0])} />
          </div>

          <div className=''>
            <label className='text-sm font-medium text-gray-700' htmlFor="name">User Name</label>
            <input name='name' className='w-full px-4 py-2 border rounded-md text-sm ' placeholder={userData?.name} id='name' type="text" onChange={(e)=>setName(e.target.value)}  value={name}/>
          </div>

          <div className=''>
            <label className='text-sm font-medium text-gray-700' >Email </label>
            <input name='name' className='w-full px-4 py-2 border rounded-md text-sm ' readOnly placeholder={userData?.email} id='email' type="email" />
          </div>

          <div className=''>
            <label className='text-sm font-medium text-gray-700' >Bio</label>
            <textarea name='description' rows={3} className='w-full resize-none focus:ring-2 focus:ring-[black] px-4 py-2 border rounded-md text-sm ' placeholder='Tell us about yourself' onChange={(e)=>setDescription(e.target.value)} value={description}/>
          </div>

          <button disabled={loading} onClick={handleEditProfile} className='w-full bg-[black] active:bg-[#454545] text-white py-2 rounded-md font-medium transition cursor-pointer  '>{loading? <ClipLoader size={30} color='white'/>: "Save Changes"}</button>

        </form>

      </div>
    </div>
  )
}

export default EditProfile
