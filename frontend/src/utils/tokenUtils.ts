// tokenUtils.ts

// ----- Token -----
export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const setToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const removeToken = (): void => {
  localStorage.removeItem("token");
};

// ----- User -----
export const getUser = (): any | null => {
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
};

export const setUser = (user: any): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUser = (): void => {
  localStorage.removeItem("user");
};

// ----- Admin -----
export const getAdmin = (): any | null => {
  const data = localStorage.getItem("admin");
  return data ? JSON.parse(data) : null;
};

export const setAdmin = (admin: any): void => {
  localStorage.setItem("admin", JSON.stringify(admin));
};

export const removeAdmin = (): void => {
  localStorage.removeItem("admin");
};

// ----- Role -----
export const getRole = (): string | null => {
  return localStorage.getItem("role");
};

export const setRole = (role: string): void => {
  localStorage.setItem("role", role);
};

export const removeRole = (): void => {
  localStorage.removeItem("role");
};

// ----- Token Expiry -----
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp ? payload.exp < currentTime : false;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Consider invalid token as expired
  }
};

// ----- Logout -----
export const logout = (): void => {
  removeToken();
  removeUser();
  removeAdmin();
  removeRole();
};
