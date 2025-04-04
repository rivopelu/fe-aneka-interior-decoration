import { BasePayload, IPayloadData } from '../../types/response/IResModel.ts';
import { createSlice } from '@reduxjs/toolkit';
import { IResListCart } from '../../types/response/IResListCart.ts';

export interface ICartReducers {
  countCart?: IPayloadData<number>;
  listCart?: IPayloadData<IResListCart[]>;
}

const initialState: ICartReducers = {};

export const CartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    countCart: (state: ICartReducers, action: BasePayload<number>) => {
      state.countCart = action.payload;
    },
    listCart: (state: ICartReducers, action: BasePayload<IResListCart[]>) => {
      state.listCart = action.payload;
    },
  },
});
