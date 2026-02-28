import express from "express";
import { sentOTP } from "../controllers/auth.controller";
import { verifyOTP } from "../controllers/auth.controller";
import { adminLogin } from "../controllers/auth.controller";
import { loginUser } from "../controllers/auth.controller";
import { GoogleAuth } from "google-auth-library";
import { logoutUser } from "../controllers/auth.controller";

const router = express.Router()

//sent OTP to email
router.post('/auth/sent-otp', sentOTP)

//Verify OTP and register user
router.post('/auth/verify-otp', verifyOTP)

router.post('/auth/login', loginUser)

router.post('/auth/logout', logoutUser)

router.post('/admin/login', adminLogin)

export default router