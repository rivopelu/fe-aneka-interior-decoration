import BaseActions from '../base-actions.ts';
import { Dispatch } from 'redux';
import { OrderSlice } from '../reducers/order.reducers.ts';
import { ENDPOINT } from '../../constants/endpoint.ts';
import { BaseResponse } from '../../types/response/IResModel.ts';
import { IResListOrderUser } from '../../types/response/IResListOrderUser.ts';

export class OrderActions extends BaseActions {
  action = OrderSlice.actions;
  getOrderUser() {
    return (dispatch: Dispatch) => {
      dispatch(this.action.listOrderUser({ loading: true, data: undefined }));
      this.httpService
        .GET(ENDPOINT.LIST_ORDER_USER())
        .then((res: BaseResponse<IResListOrderUser[]>) => {
          dispatch(this.action.listOrderUser({ loading: false, data: res.data.response_data }));
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.action.listOrderUser({ loading: false, data: undefined }));
        });
    };
  }
}
