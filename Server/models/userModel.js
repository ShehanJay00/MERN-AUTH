import mongoose from "mongoose";    

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    verifyotp: {
        type: String,
        default: ''
    },

    verifyotpExpireAt:{
        type: Number,
        default: 0
    },

    isAccountVerified: {
        type: Boolean,
        default: false
    },

    resetOtp: {
        type: String,
        default: ''
    },

    resetOtpExpireAt: {
        type: Number,
        default: 0
    }
});

const userModel = mongoose.model.users || mongoose.model("User", userSchema);

export default userModel;