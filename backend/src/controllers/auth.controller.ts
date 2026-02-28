import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { OTPService } from "../services/otp.service";
import { OAuth2Client } from "google-auth-library";
import { AdminService } from "../services/admin.service";

const adminService = new AdminService()
const authService = new AuthService()
const otpService = new OTPService()
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const sentOTP = async (req: Request, res: Response) => {
    try {
        const { email, purpose } = req.body
        if (!email || !purpose) return res.status(400).json({ message: "Email required and purpose" })

        if (purpose === "register") {
            const existingUser = await authService["userRepo"].findByEmail(email)
            if (existingUser) {
                return res.status(400).json({ message: "An account with this email already exists." })
            }
        } else if (purpose === 'forgot-password') {
            const existingUser = await authService["userRepo"].findByEmail(email);
            if (!existingUser) {
                return res.status(400).json({ message: "No account found with this email." });
            }
        }
        const result = await otpService.sentOTP(email)
        res.json(result)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" })
        }
        const result = authService.login(email, password)

        res.status(200).json({
            message: "Login successful",
            user: (await result).user,
            token: (await result).token
        })
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const verifyOTP = async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, email, password, confirmpassword, otp, purpose } = req.body
        if (!email || !otp || !purpose) {
            return res.status(400).json({ message: "Email, OTP and purpose required" })
        }
        await otpService.verifyOTP(email, otp)

        if (purpose === "register") {
            if (!firstname || !lastname || !password || !confirmpassword) {
                return res.status(400).json({ message: "All registration fields are required" });
            }
            const { user, token } = await authService.registerUser({
                firstname,
                lastname,
                email,
                password,
                confirmpassword
            });

            res.status(201).json({
                message: "OTP verified and user registered successfully",
                user: {
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    plan: user.plan,
                    isActive: user.isActive,
                    startedAt: user.startedAt,
                },
                token,
            });

        } else if (purpose === "forgot-password") {
            return res.status(200).json({ message: "OTP verified successfully" });
        }
        res.status(400).json({ message: "Invalid purpose" });
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const logoutUser = async (req: Request, res: Response) => {
    try {
        const result = authService.logout()
        res.status(200).json(result)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const adminLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Email and password required" });

        const result = await adminService.login(email, password);

        res.status(200).json({
            message: "Admin login successful",
            admin: result.admin,
            token: result.token,
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

