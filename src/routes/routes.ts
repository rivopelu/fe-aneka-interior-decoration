export const ROUTES = {
  HOME: () => `/`,
  SIGN_IN: () => `/auth/sign-in`,
  SIGN_UP: () => `/auth/sign-up`,
  ADMIN: {
    DASHBOARD: () => `/admin/dashboard`,
    PRODUCT : () => `/admin/product`
  }
};
