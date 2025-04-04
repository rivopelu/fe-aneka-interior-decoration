import BaseActions from '../base-actions.ts';
import { CartSlice } from '../reducers/cart.reducers.ts';
import { Dispatch } from 'redux';
import { ENDPOINT } from '../../constants/endpoint.ts';
import { BaseResponse } from '../../types/response/IResModel.ts';
import { IResListCart } from '../../types/response/IResListCart.ts';

export class CartAction extends BaseActions {
  private action = CartSlice.actions;

  getCount() {
    return async (dispatch: Dispatch) => {
      dispatch(this.action.countCart({ loading: true, data: undefined }));
      await this.httpService
        .GET(ENDPOINT.COUNT_CART())
        .then((res: BaseResponse<number>) => {
          dispatch(this.action.countCart({ loading: false, data: res.data.response_data }));
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.action.countCart({ loading: false, data: undefined }));
        });
    };
  }

  listCart() {
    return (dispatch: Dispatch) => {
      dispatch(this.action.listCart({ loading: true, data: undefined }));
      this.httpService
        .GET(ENDPOINT.LIST_CART())
        .then((res: BaseResponse<IResListCart[]>) => {
          dispatch(this.action.listCart({ loading: false, data: res.data.response_data }));
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.action.listCart({ loading: false, data: undefined }));
        });
    };
  }
}
