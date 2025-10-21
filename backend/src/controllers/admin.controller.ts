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