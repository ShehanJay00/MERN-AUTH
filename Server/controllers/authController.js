import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodeMailer.js';



export const register = async(req,res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.json({success: false, message: "All fields are required" });
    } 

    try{
        const existingUser = await userModel.findOne({ email });
        
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie("token", token, 
            {   httpOnly: true, 
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

        res.json({ success: true, message: "User registered successfully" });
    
        //sending welcome email
        const mailoptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to Our Service',
            text: `Hello ${name},\n\nThank you for registering with us! We're excited to have you on board.\n\nBest regards,\nThe Team`
        };

        await transporter.sendMail(mailoptions);

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};




export const login = async(req,res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "All fields are required" });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.json({ success: true, message: "User logged in successfully" });
    }

    catch (error) {
        res.json({ success: false, message: error.message });
    }
};




export const logout = async (req, res) => {

    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        res.json({ success: true, message: "User logged out successfully" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};




export const sendVerifyOtp = async (req, res) => {
    try{
        const{userId} = req.body;
        const user = await userModel.findById(userId);

        if(user.isAccountVerified){
            return res.json({success: false, message: "Account is already verified"});
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyotp = otp;
        user.verifyotpExpireAt = Date.now() + 10 * 60 * 1000; // 10 minutes

        await user.save();

        const mailoptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Hello ${user.name},\n\nYour OTP for account verification is ${otp}. It is valid for 10 minutes.\n\nBest regards,\nThe Team`
        };

        await transporter.sendMail(mailoptions);

        res.json({ success: true, message: "OTP sent to your email" });

    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
};




export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
        return res.json({ success: false, message: "All fields are required" });
    }

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.verifyotp !== otp || !user.verifyotp === '') {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        if (user.verifyotpExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP has expired" });
        }

        user.isAccountVerified = true;
        user.verifyotp = '';
        user.verifyotpExpireAt = 0;

        await user.save();

        res.json({ success: true, message: "Account verified successfully" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};




export const isAuthonticated = async (req, res) => {
    const { userId } = req.body;

    try {
        
        res.json({ success: true});

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};




export const sendResetOtp = async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.json({ success: false, message: "Email is required" });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetotp = otp;
        user.resetotpExpireAt = Date.now() + 10 * 60 * 1000; // 10 minutes

        await user.save();

        const mailoptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Hello ${user.name},\n\nYour OTP for password reset is ${otp}. It is valid for 10 minutes.\n\nBest regards,\nThe Team`
        };

        await transporter.sendMail(mailoptions);

        res.json({ success: true, message: "OTP sent to your email" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};




export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: "All fields are required" });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.resetotp !== otp || !user.resetotp === '') {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        if (user.resetotpExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP has expired" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetotp = '';
        user.resetotpExpireAt = 0;

        await user.save();

        res.json({ success: true, message: "Password reset successfully" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
