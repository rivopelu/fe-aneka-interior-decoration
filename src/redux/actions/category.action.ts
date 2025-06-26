import { Dispatch } from 'redux';
import { ENDPOINT } from '../../constants/endpoint';
import { BaseResponse } from '../../types/response/IResModel';
import BaseActions from '../base-actions';
import { productSlice } from '../reducers/product.reducers';
import { IResMasterData } from '../../types/response/IResMasterData';
import { IReqCreateSubCategory } from '../../types/request/IReqCreateSubCategory';

export class CategoryAction extends BaseActions {
  private action = productSlice.actions;

  listCategory() {
    return (dispatch: Dispatch) => {
      dispatch(this.action.listCategory({ loading: true, data: undefined }));
      this.httpService
        .GET(ENDPOINT.LIST_CATEGORY())
        .then((res: BaseResponse<IResMasterData[]>) => {
          dispatch(this.action.listCategory({ loading: false, data: res.data.response_data }));
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.action.listCategory({ loading: false, data: undefined }));
        });
    };
  }

  createSubCategory(data: IReqCreateSubCategory) {
    return new Promise((resolve, reject) => {
      this.httpService
        .POST(ENDPOINT.CREATE_SUB_CATEGORY(), data)
        .then((res: BaseResponse<IResMasterData>) => {
          resolve(res.data.response_data);
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          reject(e);
        });
    });
  }
}
