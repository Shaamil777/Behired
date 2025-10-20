
import api from "../api/api";

export interface LoginFormData {
    email:string,
    password:string
}

export interface LoginReponse {
    user:{
        id:string,
        firstname:string,
        lastname:string,
        email:string,
        plan:string,
        isActive:boolean,
        startedAt:string
    };
    token:string
}

export const loginUser = async (data: LoginFormData): Promise<LoginReponse> =>{
    const response = await api.post("/auth/login",data)
    return response.data
}

export const googleAuth = async (token:string) =>{
    const res = await api.post("/auth/google",{token})
    return res.data
}