import { productSlice } from './reducers/product.reducers';
import { CartSlice } from './reducers/cart.reducers.ts';

export const combineReducers = {
  Product: productSlice.reducer,
  Cart: CartSlice.reducer,
};
