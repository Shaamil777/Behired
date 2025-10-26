import api from "../api/api";
import  type { LoginFormData,LoginResponse } from "../types";


export const loginUser = async (data: LoginFormData): Promise<LoginResponse> =>{
    const response = await api.post("/auth/login",data)
    return response.data
}

export const googleAuth = async (token:string) =>{
    const res = await api.post("/auth/google",{token})
    return res.data
}