export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    plan: string;
    isActive: boolean;
    startedAt: string;
    role?: string;
  };
  token: string;
}
