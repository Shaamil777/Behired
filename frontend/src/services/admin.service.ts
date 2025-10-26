import api from "../api/api";
import type { AdminLoginData,AdminLoginResponse } from "../types";

export const loginAdmin = async (data: AdminLoginData): Promise<AdminLoginResponse> => {
  const res = await api.post("/admin/login", data);
  return res.data;
};

export const fetchAllUsers = async () => {
  try {
    const response = await api.get("/admin/users");
    return response.data;
  } catch (error: any) {
    console.error("Error in fetching users:", error);
    throw error.response?.data || { message: "Failed to fetch users" };
  }
};

export const toggleUserStatus = async (userId: string) => {
  const res = await api.patch(`/admin/users/${userId}/toggle-status`);
  return res.data;
};
