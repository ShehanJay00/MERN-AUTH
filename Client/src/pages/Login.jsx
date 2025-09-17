import React from "react";
import { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import {toast} from 'react-toastify';
import { useContext } from "react";

    const Login = () => {

        const navigate = useNavigate();

        const { backendURL, setIsLoggedIn, getUserData } = useContext(AppContext);

        const [state, setState] = useState('Sign up');
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const onSubmitHandler = async (e) => {

            try{
                e.preventDefault();
                axios.defaults.withCredentials = true;

                if(state === 'Sign up'){
                    const {data} = await axios.post(`${backendURL}/api/auth/register`, 
                        { name, email, password },
                        { withCredentials: true }
                    );
                    
                    if(data.success){
                        setIsLoggedIn(true)
                        getUserData()
                        navigate('/');
                    }
                    else{
                        toast.error(data.message);
                    }
                }
                else{
                    const {data} = await axios.post(`${backendURL}/api/auth/login`, 
                        { email, password },
                        { withCredentials: true }
                    );
                    if(data.success){
                        setIsLoggedIn(true)
                        getUserData()
                        navigate('/');
                    }
                    else{
                        toast.error(data.message);
                    }
                }
            }
            catch(err){
                toast.error(err.response.data.message);
            }
        }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">

            <img 
            onClick={() => navigate('/')} 
            src={assets.logo} 
            alt="Logo" 
            className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer" 
            />
            <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        
                <h2 className="text-3xl font-semibold text-white text-center mb-3">{state === 'Sign up' ? 'Create an account' : 'Welcome back!'}</h2>
                <p className="text-center text-sm mb-6">{state === 'Sign up' ? 'Create your account' : 'Please login to continue'}</p>

                <form onSubmit={onSubmitHandler} className="flex flex-col">
                    {state === 'Sign up' && (
                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                        <img src={assets.person_icon} alt="" />
                        <input 
                        onChange={(e) => setName(e.target.value)} 
                        value={name}
                        className="bg-transparent outline-none text-white" 
                        type="text" 
                        placeholder="Full Name" 
                        required 
                        />
                    </div>
                    )}

                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                        <img src={assets.mail_icon} alt="" />
                        <input 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email}
                        className="bg-transparent outline-none text-white" 
                        type="text" 
                        placeholder="Email Address" 
                        required 
                        />
                    </div>

                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                        <img src={assets.lock_icon} alt="" />
                        <input 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password}
                        className="bg-transparent outline-none text-white" 
                        type="password" 
                        placeholder="Password" 
                        required 
                        />
                    </div>

                    <p onClick={() => navigate('/reset-password')} className="mb-4 text-indigo-500 cursor-pointer">Forgot password?</p>

                    <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer">{state}</button>

                </form>

                {state === 'Sign up' ? (
                    <p className="text-gray-400 text-center text-xs mt-4">Already have an account?{' '}
                        <span onClick={() => setState('Login')} className="text-blue-400 cursor-pointer underline">Login here</span>
                    </p>
                ) : (
                    <p className="text-gray-400 text-center text-xs mt-4">Don't have an account?{' '}
                        <span onClick={() => setState('Sign up')} className="text-blue-400 cursor-pointer underline">Sign up</span>
                    </p>
                )}
            </div>
        </div>
    );
}

export default Login;
