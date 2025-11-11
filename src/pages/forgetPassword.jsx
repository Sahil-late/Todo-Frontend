import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form[0].value;
    const password = form[1].value;
    const rePassword = form[2].value;

    if (password !== rePassword) return alert("Passwords do not match!");
    axios.post('http://localhost:3000/changePassword', { email, newPassword: password })
      .then((res) => {
        let message = res.data.message;
        toast.success(<div className='text-[14px]'>{message}</div>, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        form.reset();
        setTimeout(() => {
          navigate('/');
        }, 1500);
      })
      .catch((err) => {
        toast.error(<div className='text-[14px]'>{err.response.data.error}</div>, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      });

  }
  return (
    <div className='h-screen bg-[url("https://i.pinimg.com/originals/aa/dd/6f/aadd6f1d4873462c32bc0b19b0044297.jpg")] bg-cover bg-center '>
      <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
      <h1 className='text-center py-4 text-2xl text-green-100 [-webkit-text-stroke:1px_brown]'>Change Password</h1>
      <div className='h-[70vh] flex items-center'>
        <form action="" onSubmit={(data) => { handleSubmit(data) }} className='h-fit w-[70vw] mx-auto rounded-md p-4 text-amber-50 flex flex-col items-center'>
          <div className='flex flex-col gap-5 w-[100%] sm:w-[400px] text-white bg-[rgba(0,0,0,0.4)] p-6 rounded-md border border-amber-100 mb-5 '>
            <input className='outline-none py-1 border-amber-50 border-b-2' type="email" name="" id="" placeholder='Enter E-mail' required />
            <div className='relative'>
              <input
                name='password'
                className='outline-0 w-full border-b-2 '
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter Password'
                minLength={8}
                maxLength={12}
                required
              />
              <span
                className='absolute right-1 top-2 cursor-pointer'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className='relative'>
              <input
                name='rePassword'
                className='outline-0 w-full border-b-2'
                type={showRePassword ? 'text' : 'password'}
                placeholder='Enter Password Again'
                minLength={8}
                maxLength={12}
                required
              />
              <span
                className='absolute right-1 top-2 cursor-pointer'
                onClick={() => setShowRePassword(!showRePassword)}
              >
                {showRePassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          <div className='flex justify-center'>
            <button type='submit' className='border border-amber-100 bg-[rgba(0,0,0,0.5)] text-amber-50 p-1 px-2 rounded cursor-pointer'>Confirm Password</button>
          </div>
        </form>
      </div>
      <Link to='/'>
        <button className='absolute bottom-2 left-3 border border-amber-100 bg-[rgba(0,0,0,0.5)] text-amber-50 p-2 rounded cursor-pointer capitalize'>back to login page</button>
      </Link>
    </div>
  )
}

export default ForgetPassword
