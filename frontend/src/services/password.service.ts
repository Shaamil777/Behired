import api from "../api/api";
import type { ResetPasswordData } from "../types";


export const resetPassword = async (data:ResetPasswordData)=>{
    const response = await api.post('/auth/reset-password',data)
    return response.data
}