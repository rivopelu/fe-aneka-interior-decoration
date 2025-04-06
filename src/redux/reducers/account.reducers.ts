import {
  BasePayload,
  BasePayloadPaginated,
  IPayloadData,
  IPayloadDataPaginated,
} from '../../types/response/IResModel.ts';
import { IResListShippingAddress } from '../../types/response/IResListShippingAddress.ts';
import { createSlice } from '@reduxjs/toolkit';
import { IResListAccount } from '../../types/response/IResListAccount.ts';

export interface IAccountReducer {
  listAddress?: IPayloadData<IResListShippingAddress[]>;
  listAccount?: IPayloadDataPaginated<IResListAccount[]>;
}

const initState: IAccountReducer = {};

export const accountSlice = createSlice({
  name: 'account',
  initialState: initState,
  reducers: {
    listAddress: (state: IAccountReducer, action: BasePayload<IResListShippingAddress[]>) => {
      state.listAddress = action.payload;
    },
    listAccount: (state: IAccountReducer, action: BasePayloadPaginated<IResListAccount[]>) => {
      state.listAccount = action.payload;
    },
  },
});
