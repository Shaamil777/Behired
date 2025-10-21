
export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const setToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const removeToken = (): void => {
  localStorage.removeItem("token");
};

export const getUser = (): string | null => {
  return localStorage.getItem("user");
};

export const setUser = (user: string): void => {
  localStorage.setItem("user", user);
};

export const removeUser = (): void => {
  localStorage.removeItem("user");
};

export const getAdmin = (): string | null => {
  return localStorage.getItem("admin");
};

export const setAdmin = (admin: string): void => {
  localStorage.setItem("admin", admin);
};

export const removeAdmin = (): void => {
  localStorage.removeItem("admin");
};

export const isTokenExpired = (token: string): boolean => {
  try {
    // Decode JWT token (assuming it's a JWT)
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    
    // Check if token has expired
    return payload.exp ? payload.exp < currentTime : false;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Consider invalid token as expired
  }
};

export const logout = (): void => {
  removeToken();
  removeUser();
  removeAdmin();
};