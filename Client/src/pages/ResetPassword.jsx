import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

    const ResetPassword = () => {

        const navigate = useNavigate();

        const { backendURL } = React.useContext(AppContext);
        axios.defaults.withCredentials = true;

        const [email, setEmail] = React.useState('');
        const [newPassword, setNewPassword] = React.useState('');
        const [isEmailSent, setIsEmailSent] = React.useState('');
        const [otp, setOtp] = React.useState(0);
        const [isOtpSubmited, setIsOtpSubmited] = React.useState(false);
        

        const inputRefs = React.useRef([]);
        
                const handleInput = (e, index) => {
                    if(e.target.value.length > 0 && index < inputRefs.current.length - 1){
                        inputRefs.current[index + 1].focus();
                    }
                };
        
                const handleKeyDown = (e, index) => {
                    if(e.key === 'Backspace' && index > 0 && e.target.value === ''){
                        inputRefs.current[index - 1].focus();
                    }
                }
        
                const handlePaste = (e) => {
                    const pasteData = e.clipboardData.getData('text').split('');
                    pasteData.forEach((char, index) => {
                        if(inputRefs.current[index] ){
                            inputRefs.current[index].value = char;
                        }
                    });
                }

        const onSubmitEmail = async (e) => {

            e.preventDefault();
            try {
                const {data} = await axios.post(`${backendURL}/auth/send-reset-otp`, { email });
                data.success ? toast.success(data.message) : toast.error(data.message);
                data.success && setIsEmailSent(true);

            } catch (error) {
                toast.error(error.message);
            }
        }

        const onSubmitOtp = async (e) => {
            e.preventDefault();
            try {
                const otpArray = inputRefs.current.map(e => e.value);
                setOtp(otpArray.join(''));
                setIsOtpSubmited(true);

            } catch (error) {
                toast.error(error.message);
            }
        }

        const onSubmitNewPassword = async (e) => {
            e.preventDefault();
            try {
                const {data} = await axios.post(`${backendURL}/auth/reset-password`, { email, otp, newPassword });
                data.success ? toast.success(data.message) : toast.error(data.message);
                data.success && navigate('/login');

            } catch (error) {
                toast.error(error.message);
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

        {!isEmailSent &&
            <form onSubmit={onSubmitEmail} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
                <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset Password</h1>
                <p className="text-indigo-300 text-center mb-6">Enter your registered email address</p>
                <div className="flex items-center mb-4 gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                    <img src={assets.mail_icon} alt="Email" className="w-3 h-3" />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="bg-transparent outline-none text-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full cursor-pointer mt-3">Submit</button>
            </form>
        }

        {!isOtpSubmited && isEmailSent && 
            <form onSubmit={onSubmitOtp} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
                <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset password OTP</h1>
                <p className="text-indigo-300 text-center mb-6">Enter the 6-digit code sent to your email id</p>

                <div className="flex justify-between mb-8" onPaste={handlePaste}>
                    {Array(6).fill(0).map((_, index) => (
                        <input 
                            key={index}
                            type="text" 
                            maxLength='1'
                            placeholder="" 
                            required
                            className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md" 
                            ref={ e => inputRefs.current[index] = e}
                            onInput={(e) =>  handleInput(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}   
                        />
                    ))}
                </div>

                <button className = 'w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full cursor-pointer' >Submit</button>
            </form>
        }

        {isOtpSubmited && isEmailSent &&
            <form onSubmit={onSubmitNewPassword} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
                <h1 className="text-white text-2xl font-semibold text-center mb-4">New Password</h1>
                <p className="text-indigo-300 text-center mb-6">Enter the new password below</p>
                <div className="flex items-center mb-4 gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                    <img src={assets.lock_icon} alt="Password" className="w-3 h-3" />
                    <input 
                        type="password" 
                        placeholder="New Password" 
                        className="bg-transparent outline-none text-white"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full cursor-pointer mt-3">Submit</button>
            </form>
        }
        </div>
    );
    };

export default ResetPassword;
