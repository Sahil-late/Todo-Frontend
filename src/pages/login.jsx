import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Home from '../components/home';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from "../config";


const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (data) => {
        data.preventDefault();
        const form = data.target;
        const email = form[0].value;
        const password = form[1].value;
        const credentials = { email, password };
        await axios.post(`${API_BASE_URL}/login`, {
            credentials
        }).then((res) => {
            if (res.data[0] === 'Login successfuly') {
                toast.success(<div className='text-[14px]'>{res.data[0]}</div>, {
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
                setTimeout(() => {
                    navigate('/home');
                    localStorage.setItem('username', res.data[1]);
                }, 2000);

            }
            else if (res.data === 'password not matched' || res.data === 'username doesnt matched') {
                toast.warning(<div className='text-[14px]'>{res.data}</div>, {
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
            }
            else {
                toast.error(<div className='text-[14px]'>{res.data}</div>, {
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
            }
        }).catch((er) => console.log(er))
        form.reset();
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
            <div className='login-container text-amber-50 h-[100dvh] flex flex-col justify-center items-center gap-5 bg-[url("https://i.pinimg.com/originals/aa/dd/6f/aadd6f1d4873462c32bc0b19b0044297.jpg")] bg-cover bg-center'>
                <div className='login-box flex flex-col gap-5 p-5 bg-[rgba(0,0,0,0.3)] shadow-md shadow-gray-800 rounded-md w-[240px] sm:w-[350px]'>
                    <h1 className='text-center text-4xl text-red-500'>Login</h1>
                    <form className='' onSubmit={(data) => handleSubmit(data)} >
                        <div className='flex flex-col gap-1'>
                            <input className='outline-0 border-b-2' type="email" placeholder='Email' required onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    handleSubmit();
                                }
                            }} />
                            <br />
                            <div className='relative'>
                                <input
                                    name='password'
                                    className='outline-0 w-full border-b-2 bg-transparent placeholder:text-gray-200 pr-8'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Password'
                                    minLength={8}
                                    maxLength={12}
                                    required
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            handleSubmit();
                                        }
                                    }}
                                />
                                <span
                                    className='absolute right-1 top-2 cursor-pointer'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                        </div>
                        <br />
                        <input type="checkbox" name="remember" id="remember" /> <label className='cursor-pointer' htmlFor="remember">Remember Me</label>
                        <br />
                        <Link to='/forgetPassword'>
                            <button className='mx-3 mt-2 text-[14px text-red-500 cursor-pointer' type='button'>Forget Password</button>
                        </Link>
                        <div className='flex justify-center my-2.5'>
                            <button className='border cursor-pointer border-gray-400 rounded-xl px-3 bg-gray-50 text-black' type='submit'>Login</button>
                        </div>
                        <div className='flex gap-2 pt-1 justify-center'>
                            <p>Dont have an account?</p>
                            <Link to='/signIn'>
                                <button className='underline decoration-amber-500 cursor-pointer' type='button'>Sign Up</button>
                            </Link>
                        </div>
                    </form>
                </div>
                <Link to='/withoutLogin'>
                    <button className='absolute bottom-2 left-3 border border-amber-100 bg-[rgba(0,0,0,0.5)] text-amber-50 p-2 rounded cursor-pointer capitalize'>Without Login</button>
                </Link>
            </div>
        </>
    )
}

export default Login
