import { UserRepository } from "../repositories/user.repositoy";
import bcrypt from "bcryptjs"

const userRepo = new UserRepository()


export class PasswordService {
    async resetPassword(email:string,newPassword:string,confirmPassword:string){
        if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match");
        }
        const user = await userRepo.findByEmail(email)
        if(!user) throw new Error("User not found");
        
        const hashedPassword = await bcrypt.hash(newPassword,10)
        await userRepo.updatePassword(email,hashedPassword);


        return { message: "Password reset successfully" };
    }
}