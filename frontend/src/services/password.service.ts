import api from "../api/api";

export interface ResetPasswordData{
    email:string,
    newPassword:string,
    confirmPassword:string
}

export const resetPassword = async (data:ResetPasswordData)=>{
    const response = await api.post('/auth/reset-password',data)
    return response.data
}