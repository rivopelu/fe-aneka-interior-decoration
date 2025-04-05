import { BasePayload, IPayloadData } from '../../types/response/IResModel.ts';
import { IResListOrderUser } from '../../types/response/IResListOrderUser.ts';
import { createSlice } from '@reduxjs/toolkit';
import { IResDetailOrder } from '../../types/response/IResDetailorder.ts';

export interface IOrderReducer {
  listOrderUser?: IPayloadData<IResListOrderUser[]>;
  detailOrder?: IPayloadData<IResDetailOrder>
}

const initState: IOrderReducer = {};

export const OrderSlice = createSlice({
  name: 'order',
  initialState: initState,
  reducers: {
    listOrderUser: (state: IOrderReducer, action: BasePayload<IResListOrderUser[]>) => {
      state.listOrderUser = action.payload;
    },
    detailOrder: (state: IOrderReducer, action: BasePayload<IResDetailOrder>) => {
      state.detailOrder = action.payload
    }
  },
});
