import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repositoy";
import { OAuth2Client } from "google-auth-library";

const JWT_SECRET = process.env.JWT_SECRET || "BeHiredSecret";


interface GoogleLoginData {
  firstname?: string;
  lastname?: string;
  email: string;
  googleId: string;
}

export class AuthService {
  private userRepo = new UserRepository();

  async registerUser(data: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmpassword: string;
  }) {
    const { firstname, lastname, email, password, confirmpassword } = data;
    if (password !== confirmpassword) throw new Error("Passwords do not match");

    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userRepo.createUser({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      isActive: true,
      startedAt: new Date(),
    });

    const token = Jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "1d" });

    return { user: newUser, token };
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user || !user.password) throw new Error("Invalid email or password");
    if (user.role !== "user") throw new Error("Account doesnt exist")
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    const token = Jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    return {
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
    };
  }

  async googleLogin(data: GoogleLoginData) {
    const { email, firstname, lastname, googleId } = data

    let user = await this.userRepo.findByEmail(email)

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId
        await user.save()
      }
    } else {
      user = await this.userRepo.createUser({
        firstname: firstname || "User",
        lastname: lastname || "",
        email,
        googleId,
        isActive: true,
        startedAt: new Date(),
        password: undefined,
      });
    }

    const token = Jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" })

    return {
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
    }
  }

  async logout() {
    return { message: "Logout successful" }
  }

}
