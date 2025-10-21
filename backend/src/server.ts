import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
import connectDB from "./config/db";
import authRouter from "./routes/auth.routes";
import passwordRouter from './routes/password.routes'
import adminRouter from './routes/admin.routes'
import { configDotenv } from "dotenv";

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: "http://localhost:5173", // your frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true // if you want cookies/auth headers
}));



connectDB()

app.use("/api", authRouter);
app.use("/api", passwordRouter)
app.use('/api', adminRouter)

app.listen(5000,()=>{
    console.log("Server running on port 5000")
})