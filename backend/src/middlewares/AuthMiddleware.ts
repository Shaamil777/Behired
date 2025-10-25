// import { Request,response,NextFunction } from "express";
// import { UserRepository } from "../repositories/user.repositoy";
// import  jwt  from "jsonwebtoken";


// const JWT_SECRET = process.env.JWT_SECRET || "BeHiredKey"

// export const checkUserStatus = async (req:Request,res:Response) =>{
//     try {
//         const authHeader = req.headers.authorization
//         if(!authHeader){
//             return res.status(401).json({message:"No token provided"})
//         }
//         const token = authHeader.split(" ")[1]
//         if(!token) return
//         const decoded:any = jwt.verify(token,JWT_SECRET)

//         const userRepo = new UserRepository()
//         const user = await userRepo.findById(decoded.id)

//         if(!user) {
//             return res.status(404).json({message:"User not found"})
//         }
//         if(user.isActive === false){
//             return res.status(403).json({message:"User is banned"})
//         }
//         req.user = user
//         next()

//     } catch (error:any) {
//         console.error("Auth middleware error:", error);
//         return res.status(401).json({ message: "Invalid or expired token" });
//     }
// }