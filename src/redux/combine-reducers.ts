import { productSlice } from './reducers/product.reducers';
import { CartSlice } from './reducers/cart.reducers.ts';
import { accountSlice } from './reducers/account.reducers.ts';

export const combineReducers = {
  Product: productSlice.reducer,
  Cart: CartSlice.reducer,
  Account: accountSlice.reducer,
};
