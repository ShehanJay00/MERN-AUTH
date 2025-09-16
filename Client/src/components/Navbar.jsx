    import React from 'react'
    import {assets} from '../assets/assets.js'

    const Navbar = () => {
    return (
        <div className='w-full flex py-6 justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
            <img src={assets.logo} alt="logo" className='w-28 sm:w-32' /> 

            <button className='flex items-center gap-2 border border-grey-500 rounded-full px-6 py-2 text-gray-800 hover:bg-grey-100'>
                Login <img src={assets.arrow_icon} alt="Arrow Icon" /></button>

        </div>
    )
    }

    export default Navbar
