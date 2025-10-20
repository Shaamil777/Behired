import { OTPRepository } from "../repositories/otp.repository";
import { sentOTPEmail } from "../utils/mailer";

const otpRepo = new OTPRepository()

export class OTPService {
    async sentOTP(email:string){
        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); //five minutesss

        await otpRepo.createOTP(email,otp,expiresAt)
        await sentOTPEmail(email,otp)

        return {message:"OTP sent successfully"}
    }

    async verifyOTP(email:string,otp:string){
        const record = await otpRepo.findOTP(email)
        if(!record) throw new Error('OTP not found or expired')
        
        if(record.otp !== otp) throw new Error("Invalid OTP");

        if(new Date() > record.expiresAt){
            await otpRepo.deleteOTP(email)
            throw new Error('OTP expired')
        }

        await otpRepo.deleteOTP(email)
        return {message:"OTP verified successfully"}

    }
}