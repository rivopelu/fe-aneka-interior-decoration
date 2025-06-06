import { Dispatch } from 'redux';
import { ENDPOINT } from '../../constants/endpoint.ts';
import { IResDetailOrder } from '../../types/response/IResDetailorder.ts';
import { IResListOrderUser } from '../../types/response/IResListOrderUser.ts';
import { BaseResponse, BaseResponsePaginated } from '../../types/response/IResModel.ts';
import BaseActions from '../base-actions.ts';
import { OrderSlice } from '../reducers/order.reducers.ts';
import { IResListOrderAdmin } from '../../types/response/IResListOrderAdmin.ts';

export class OrderActions extends BaseActions {
  action = OrderSlice.actions;

  getListOrderAdmin(param?: string) {
    return (dispatch: Dispatch) => {
      dispatch(this.action.listOrderAdmin({ loading: true, data: undefined }));
      this.httpService
        .GET(ENDPOINT.GET_LIST_ORDER_ADMIN() + (param || ''))
        .then((res: BaseResponsePaginated<IResListOrderAdmin[]>) => {
          dispatch(
            this.action.listOrderAdmin({
              loading: false,
              data: res.data.response_data,
              paginated_data: res.data.paginated_data,
            }),
          );
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.action.listOrderAdmin({ loading: false, data: undefined }));
        });
    };
  }
  getDetailOrder(id: string) {
    return (dispatch: Dispatch) => {
      dispatch(this.action.detailOrder({ loading: true, data: undefined }));
      this.httpService
        .GET(ENDPOINT.DETAIL_ORDER(id))
        .then((res: BaseResponse<IResDetailOrder>) => {
          dispatch(this.action.detailOrder({ loading: false, data: res.data.response_data }));
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.action.detailOrder({ loading: false, data: undefined }));
        });
    };
  }
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
