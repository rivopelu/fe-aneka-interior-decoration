import { createSlice } from '@reduxjs/toolkit';
import { IResListProduct } from '../../types/response/IResListProduct';
import { BasePayloadPaginated, IPayloadDataPaginated } from '../../types/response/IResModel';

export interface IProductReducers {
  listProduct?: IPayloadDataPaginated<IResListProduct[]>;
}

const initState: IProductReducers = {};

export const productSlice = createSlice({
  name: 'post',
  initialState: initState,
  reducers: {
    listProduct: (state: IProductReducers, action: BasePayloadPaginated<IResListProduct[]>) => {
      state.listProduct = action.payload;
    },

  },
});
