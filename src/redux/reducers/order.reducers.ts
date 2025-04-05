import { BasePayload, IPayloadData } from '../../types/response/IResModel.ts';
import { IResListOrderUser } from '../../types/response/IResListOrderUser.ts';
import { createSlice } from '@reduxjs/toolkit';

export interface IOrderReducer {
  listOrderUser?: IPayloadData<IResListOrderUser[]>;
}

const initState: IOrderReducer = {};

export const OrderSlice = createSlice({
  name: 'order',
  initialState: initState,
  reducers: {
    listOrderUser: (state: IOrderReducer, action: BasePayload<IResListOrderUser[]>) => {
      state.listOrderUser = action.payload;
    },
  },
});
