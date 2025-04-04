import { BasePayload, IPayloadData } from '../../types/response/IResModel.ts';
import { IResListShippingAddress } from '../../types/response/IResListShippingAddress.ts';
import { createSlice } from '@reduxjs/toolkit';

export interface IAccountReducer {
  listAddress?: IPayloadData<IResListShippingAddress[]>;
}

const initState: IAccountReducer = {};

export const accountSlice = createSlice({
  name: 'account',
  initialState: initState,
  reducers: {
    listAddress: (state: IAccountReducer, action: BasePayload<IResListShippingAddress[]>) => {
      state.listAddress = action.payload;
    },
  },
});
