export const ROUTES = {
  HOME: () => `/`,
  SIGN_IN: () => `/auth/sign-in`,
  SIGN_UP: () => `/auth/sign-up`,
  DETAIL_PRODUCT: (id: string) => `/product/detail/${id}`,
  CART: () => `/cart`,
  ADDRESS: () => `/address`,
  NEW_ADDRESS: () => `/address/new`,
  MY_ORDER: () => `/order`,
  DETAIL_MY_ORDER: (id: string) => `/order/${id}`,
  ADMIN: {
    DASHBOARD: () => `/admin/dashboard`,
    PRODUCT: () => `/admin/product`,
    NEW_PRODUCT: () => `/admin/product/new`,
  },
};
