import React, { useContext } from 'react'
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext.jsx';

    const Header = () => {

        const {userData} = useContext(AppContext);

    return (
        <div className='flex flex-col items-center justify-center mt-20 px-4 text-center text-gray-800'>

            <img src={assets.header_img} alt="Header Img" className="w-36 h-36 rounded-full mb-6"/>
            <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>
                Hey {userData ? userData.name : 'Developer'}!
                <img className='w-8 aspect-square' src={assets.hand_wave} alt="Hand Wave" />
            </h1>
        
            <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>
                Welcome to our app
            </h2>

            <p className='mb-8 max-w-md'>
                This is a modern authentication app built with the MERN stack. It features user registration, login, email verification, and password reset functionalities.
            </p>

            <button className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-200 transition-all'>
                Get Started
            </button>

        </div>
    )
    }

export default Header


