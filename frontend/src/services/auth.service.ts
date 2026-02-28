import api from "../api/api";
import type { LoginFormData, LoginResponse } from "../types";
import { logout as clearLocalData } from "../utils/tokenUtils";

export const loginUser = async (data: LoginFormData): Promise<LoginResponse> => {
    const response = await api.post("/auth/login", data)
    return response.data
}

export const googleAuth = async (token: string) => {
    const res = await api.post("/auth/google", { token })
    return res.data
}

export const logoutUser = async () => {
    try {
        // Call backend to invalidate token or session
        await api.post("/auth/logout");

        // 🔥 REAL logout — clear stored auth data using existing tokenUtils
        clearLocalData();

        // Redirect to login page
        window.location.href = "/login";

    } catch (error) {
        console.error("Logout failed:", error);
        // Failsafe: clear data and redirect even if backend API fails
        clearLocalData();
        window.location.href = "/login";
    }
};