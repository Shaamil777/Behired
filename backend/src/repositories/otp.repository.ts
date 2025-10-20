import OTP from "../models/otp.models"
export class OTPRepository {
    async createOTP(email:string,otp:string,expiresAt:Date){
        await OTP.deleteMany({email})
        return await OTP.create({email,otp,expiresAt})
    }
    async findOTP(email:string){
        return await OTP.findOne({email})
    }
    async deleteOTP(email:string){
        await OTP.deleteMany({email})
    }
}