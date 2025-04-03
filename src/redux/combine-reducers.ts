import { productSlice } from "./reducers/product.reducers";

export const combineReducers = {
  Product: productSlice.reducer,
};
