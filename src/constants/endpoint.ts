export const ENDPOINT = {
  SIGN_IN: () => `/auth/v1/sign-in`,
  SIGN_UP: () => `/auth/v1/sign-up`,
  LIST_PRODUCT: () => `/v1/product/list`,
  UPLOAD: () => `/v1/upload`,
  LIST_CATEGORY: () => `/v1/category/list`,
  CREATE_PRODUCT: () => `/v1/product/new`,
  DETAIL_PRODUCT: (id: string) => `/v1/product/detail/${id}`,
  COUNT_CART: () => `/chart/v1/count`,
  LIST_CART: () => `/chart/v1/list`,
  ADD_TO_CART: () => `/chart/v1/add`,
  REMOVE_CHART_ITEM: (id: string) => `/chart/v1/remove/${id}`,
};
