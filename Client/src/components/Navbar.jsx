    import {assets} from '../assets/assets.js'
    import { useNavigate } from 'react-router-dom'
    import { AppContext } from '../context/AppContext.jsx'
    import axios from 'axios';
    import { toast } from 'react-toastify';
    import { useContext } from 'react';

    const Navbar = () => {

        const navigate = useNavigate();
        const {userData, backendURL, setUserData, setIsLoggedIn} = useContext(AppContext);

        const sendVerificationOtp = async () => {
            try {
                axios.defaults.withCredentials = true;
                const {data} = await axios.post(`${backendURL}/api/auth/send-verify-otp`, {}, { withCredentials: true });
            
                if(data.success){
                    navigate('/email-verify');
                    toast.success(data.message);
                }
                else{
                    toast.error(data.message);
                }
                
            } catch(err){
                toast.error(err.response.data.message);
            }
        }


        const logout = async () => {
            try {
                axios.defaults.withCredentials = true;
                const {data} = await axios.post(`${backendURL}/api/auth/logout`, {}, { withCredentials: true });
                data.success && setIsLoggedIn(false);
                data.success && setUserData(false);
                navigate('/');

            } catch(err){
                toast.error(err.response.data.message);
            }
        }

        return (
            <div className='w-full flex py-6 justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
                <img src={assets.logo} alt="logo" className='w-28 sm:w-32' /> 
            
                {userData ?
                <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'> 
                {userData.name[0].toUpperCase()} 
                    <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
                        <ul className='list-none m-0 p-2 bg-gray-200 w-40'>
                            {!userData.isAccountVerified && <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-gray-400 cursor-pointer pr-10'>Verify email</li>}
                            <li onClick={logout} className='py-1 px-2 hover:bg-gray-400 cursor-pointer pr-10'>Logout</li>
                        </ul>
                    </div>
                </div>
                
                :<button onClick={() => navigate('/login')}
                    className='flex items-center gap-2 border border-grey-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-200 transition-all'>
                    Login <img src={assets.arrow_icon} alt="Arrow Icon" />
                </button>
                }
            </div>
        );
    }

export default Navbar;