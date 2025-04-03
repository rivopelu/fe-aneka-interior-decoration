import { createSlice } from '@reduxjs/toolkit';
import { IResListProduct } from '../../types/response/IResListProduct';
import { BasePayload, BasePayloadPaginated, IPayloadData, IPayloadDataPaginated } from '../../types/response/IResModel';
import { IResMasterData } from '../../types/response/IResMasterData';

export interface IProductReducers {
  listProduct?: IPayloadDataPaginated<IResListProduct[]>;
  listCategory?: IPayloadData<IResMasterData[]>
}

const initState: IProductReducers = {};

export const productSlice = createSlice({
  name: 'post',
  initialState: initState,
  reducers: {
    listCategory: (state: IProductReducers, action: BasePayload<IResMasterData[]>) => {
      state.listCategory = action.payload
    },
    listProduct: (state: IProductReducers, action: BasePayloadPaginated<IResListProduct[]>) => {
      state.listProduct = action.payload;
    },

  },
});
