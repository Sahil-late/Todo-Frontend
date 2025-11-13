import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from "../config";



const SignIn = () => {
    const [data, setdata] = useState([])
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        data.preventDefault();
        const form = data.target;
        const username = form[0].value;
        const email = form[1].value;
        const password = form[2].value;
        const re_password = form[3].value;
        if (password !== re_password) {
            toast.warning(<div className='uppercase'>password does not match !</div>, {
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
            return;
        }
        const credentials = { username, email, password, re_password };
        setdata(credentials);
        if (data.length !== 0) {
            await axios.post(`${API_BASE_URL}/signIn`, {
                credentials
            }).then((res) => {
                toast.success(<div className='text-[12px] text-amber-100'>{res.data.message}</div>, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                })
                setTimeout(()=>{
                    navigate('/');
                },2000)
                form.reset();
            }).catch((err) => {
                toast.success(<div className='text-[13px] text-amber-100'>{err.response.data.error}</div>, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                })
                form.reset();
            })
            
        }

    }

    return (
        <>
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
            <div className='signin-container text-amber-50 w-[100vw] h-[100dvh] flex flex-col justify-center items-center gap-5 bg-[url("https://i.pinimg.com/originals/aa/dd/6f/aadd6f1d4873462c32bc0b19b0044297.jpg")] bg-cover bg-center'>
                <div className='signin-box w-[240px] sm:w-[350px] lg:w-[400px] flex flex-col justify-center gap-5 p-5 bg-[rgba(0,0,0,0.3)] shadow-md shadow-gray-800 rounded-md '>
                    <h1 className='text-center text-3xl'>Sign Up</h1>
                    <form onSubmit={(data) => handleSubmit(data)} >
                        <div className='flex flex-col gap-1'>
                            <input className=' outline-0 border-b-2' type="text" placeholder='Username' minLength={8} maxLength={12}
                                pattern="[A-Za-z0-9_!@#$%^&*]{8,20}"
                                title="8–12 characters; letters, numbers, and _!@#$%^&* allowed" />
                            <br />
                            <input className='outline-0 border-b-2' type="email" placeholder='Email' required />
                            <br />
                            <div className='relative'>
                                <input
                                    name='password'
                                    className='outline-0 w-full border-b-2'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Password'
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
                            <br />
                            <div className='relative'>
                                <input
                                    name='rePassword'
                                    className='outline-0 w-full border-b-2'
                                    type={showRePassword ? 'text' : 'password'}
                                    placeholder='Re-enter Password'
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
                        <div className='flex justify-center my-2.5'>
                            <button className='border cursor-pointer border-gray-400 rounded-xl px-3 bg-gray-50 text-black' type='submit'>Sign In</button>
                        </div>
                        <div className='flex gap-2 pt-1 justify-center'>
                            <p>Account Exists?</p>
                            <Link to='/'>
                                <button className='underline decoration-amber-500 cursor-pointer'>Login</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignIn