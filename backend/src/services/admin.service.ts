import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repositoy";

const JWT_SECRET = process.env.JWT_SECRET || "BeHiredSecret";

export class AdminService {
  private userRepo = new UserRepository();

  async login(email: string, password: string) {
    const admin = await this.userRepo.findByEmail(email);

    if (!admin) throw new Error("Invalid email or password");

    // check role
    if (admin.role !== "admin") throw new Error("Not authorized as admin");

    // compare password
    if (!admin.password) throw new Error("Invalid email or password");
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new Error("Invalid email or password");

    const token = Jwt.sign({ id: admin._id, role: "admin" }, JWT_SECRET, { expiresIn: "1d" });

    return {
      admin: {
        id: admin._id,
        email: admin.email,
        createdAt: admin.createdAt,
      },
      token,
    };
  }

  async getAllUsers(){
    const users = await this.userRepo.findAllUsers()
    return users
  }
  async toggleUserStatus(userId:string){
    const result = await this.userRepo.toggleUserStatus(userId)

    const message = result.isActive
    ? "User has been banned successfully"
    :"User has been unbanned successfully";

    return {message,user:result};
  }
}
