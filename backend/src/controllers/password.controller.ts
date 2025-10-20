import { Request,Response } from "express";
import { PasswordService } from "../services/password.service";

const passwordService = new PasswordService()

export const resetPassword = async(req:Request,res:Response)=>{
    try {
        const {email,newPassword,confirmPassword} = req.body
        
        if(!email || !newPassword || !confirmPassword){
            return res.status(400).json({message:"All fields are required"})
        }

        const result = await passwordService.resetPassword(email,newPassword,confirmPassword)
        res.status(200).json(result)
    } catch (error:any) {
        res.status(400).json({message:error.message})
    }
}