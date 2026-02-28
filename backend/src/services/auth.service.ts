import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repositoy";

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
        role: user.role,
      },
      token,
    };
  }

  async googleAuth(accessToken: string) {
    try {
      const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to authenticate with Google");
      }

      const data: any = await response.json();
      const email = data.email;
      const firstname = data.given_name || "";
      const lastname = data.family_name || "";

      if (!email) {
        throw new Error("No email found in Google account");
      }

      let user = await this.userRepo.findByEmail(email);

      if (!user) {
        user = await this.userRepo.createUser({
          firstname,
          lastname,
          email,
          password: "", // Users signing up with Google won't have a regular password
          isActive: true,
          startedAt: new Date(),
        });
      }

      if (user.role !== "user") {
        throw new Error("Invalid account type");
      }

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
          role: user.role,
        },
        token,
      };
    } catch (error: any) {
      throw new Error(error.message || "Google authentication failed");
    }
  }

  async logout() {
    return { message: "Logout successful" }
  }

}
