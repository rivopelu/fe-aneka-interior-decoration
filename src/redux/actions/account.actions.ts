import BaseActions from '../base-actions.ts';
import { Dispatch } from 'redux';
import { accountSlice } from '../reducers/account.reducers.ts';
import { ENDPOINT } from '../../constants/endpoint.ts';
import { BaseResponse, BaseResponsePaginated } from '../../types/response/IResModel.ts';
import { IResListShippingAddress } from '../../types/response/IResListShippingAddress.ts';
import { IResListAccount } from '../../types/response/IResListAccount.ts';

export class AccountActions extends BaseActions {
  private action = accountSlice.actions;

  getListAccounts(param?: string) {
    return (dispatch: Dispatch) => {
      dispatch(this.action.listAccount({ loading: true, data: undefined }));
      this.httpService
        .GET(ENDPOINT.LIST_ACCOUNT() + (param || ''))
        .then((res: BaseResponsePaginated<IResListAccount[]>) => {
          dispatch(
            this.action.listAccount({
              loading: false,
              data: res.data.response_data,
              paginated_data: res.data.paginated_data,
            }),
          );
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.action.listAccount({ loading: false, data: e }));
        });
    };
  }

  getListAddress() {
    return (dispatch: Dispatch) => {
      dispatch(this.action.listAddress({ loading: true, data: undefined }));
      this.httpService
        .GET(ENDPOINT.LIST_SHIPPING_ADDRESS())
        .then((res: BaseResponse<IResListShippingAddress[]>) => {
          dispatch(this.action.listAddress({ loading: false, data: res.data.response_data }));
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.action.listAddress({ loading: false, data: undefined }));
        });
    };
  }
}
