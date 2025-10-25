import { Request,Response } from "express";
import { AdminService } from "../services/admin.service";

const adminService = new AdminService()

export const getAllUsers = async(req:Request,res:Response)=>{
    try {
        const users  =await adminService.getAllUsers()
        res.status(200).json({success:true,users})
    } catch (error:any) {
        res.status(500).json({success:false,message:error.message})
    }
}

export const toggleUserStatus = async(req:Request,res:Response)=>{
    try {
        const { userId } = req.params
        if(!userId) return
        const response = await adminService.toggleUserStatus(userId)
        res.status(200).json({
            success:true,
            message:response.message,
            user:response.user
        })
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:error.message || "Something went wrong"
        })
    }
}