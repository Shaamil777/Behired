export interface AdminLoginData {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  admin: {
    id: string;
    email: string;
    createdAt: string;
  };
  token: string;
}

export interface User {
  id: string;
  email: string;
  firstname?: string;
  lastname?: string;
  plan?: string;
  isActive: boolean;
  createdAt?: string;
}
