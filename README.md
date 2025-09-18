# MERN Authentication System

A complete **Authentication System** built with the **MERN stack** (MongoDB, Express, React, Node.js).  
It provides a **secure and production-ready auth flow**, including **JWT authentication**, **email verification**, and **password reset with OTP**.  

---

## ✨ Features

- 👤 **User Registration & Login**  
- 📧 **Email Verification** (activate account via email link/OTP)  
- 🔑 **JWT Authentication** (secure login & protected routes)  
- 🔐 **Password Reset with OTP**  
- 🛡️ **Secure password hashing** with bcrypt  
- ⏳ **OTP expiry (default: 10 minutes)**  
- 🎨 **React frontend with user-friendly UI**  
- 🚀 **Backend REST API with Express + MongoDB**  

---

## 🛠️ Tech Stack

**Frontend**
- React.js  
- Axios  
- React Router DOM  
- Toastify (notifications)  

**Backend**
- Node.js + Express  
- MongoDB + Mongoose  
- Bcrypt.js (password hashing)  
- JSON Web Token (JWT)  
- Nodemailer (send verification/reset emails)  

---

## 📂 Project Structure
📦 project-root
├── 📁 backend
│ ├── models/
│ │ └── User.js # User schema (email verification, reset OTP, password hash)
│ ├── controllers/
│ │ └── authController.js # Register, Login, Email Verify, Reset Password
│ ├── routes/
│ │ └── authRoutes.js # API routes
│ ├── middleware/
│ │ └── authMiddleware.js # JWT protect routes
│ ├── server.js # Express entry
│ └── .env # Environment variables
│
├── 📁 frontend
│ ├── src/
│ │ ├── components/
│ │ │ ├── Register.jsx
│ │ │ ├── Login.jsx
│ │ │ ├── VerifyEmail.jsx
│ │ │ └── ResetPassword.jsx
│ │ ├── App.js
│ │ └── ...
│ └── package.json
│
├── README.md
└── package.json
