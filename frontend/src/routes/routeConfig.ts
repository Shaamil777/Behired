export const ROUTES = {
  // User routes
  USER: {
    LANDING: '/',
    HOME: '/home',
    LOGIN: '/login',
    REGISTER: '/register',
    VERIFY_OTP: '/verify-otp',
    FORGOT_PASSWORD: '/forgot-password',
    CHANGE_PASSWORD: '/change-password',
    BANNED: '/banned',
    // PROFILE: '/profile',
    // SETTINGS: '/settings',
  },

  // Admin routes
  ADMIN: {
    LOGIN: '/admin/login',
    DASHBOARD: '/admin/dashboard',
    USER_MANAGEMENT: '/admin/usermanagement',
    // POSTS: '/admin/posts',
    // REPORTS: '/admin/reports',
    // APPLICATIONS: '/admin/applications',
    // SUBSCRIPTIONS: '/admin/subscriptions',
    // INTERVIEWS: '/admin/interviews',
  }
} as const;