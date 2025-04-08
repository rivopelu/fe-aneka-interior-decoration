import { Dispatch } from 'redux';
import { ENDPOINT } from '../../constants/endpoint';
import { IResListProduct } from '../../types/response/IResListProduct';
import { BaseResponse, BaseResponsePaginated } from '../../types/response/IResModel';
import BaseActions from '../base-actions';
import { productSlice } from '../reducers/product.reducers';
import { IResMasterData } from '../../types/response/IResMasterData';
import { IResDetailProduct } from '../../types/response/IResDetailProduct';

export class ProductAction extends BaseActions {
  private action = productSlice.actions;
  listProduct(param?: string) {
    return (dispatch: Dispatch) => {
      dispatch(this.action.listProduct({ loading: true, data: undefined }));
      this.httpService
        .GET(ENDPOINT.LIST_PRODUCT() + (param || ''))
        .then((res: BaseResponsePaginated<IResListProduct[]>) => {
          dispatch(
            this.action.listProduct({
              loading: false,
              data: res.data.response_data,
              paginated_data: res.data.paginated_data,
            }),
          );
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.action.listProduct({ loading: false, data: undefined }));
        });
    };
  }

  listProductAdmin(param?: string) {
    return (dispatch: Dispatch) => {
      dispatch(this.action.listProduct({ loading: true, data: undefined }));
      this.httpService
        .GET(ENDPOINT.LIST_PRODUCT_ADMIN() + (param || ''))
        .then((res: BaseResponsePaginated<IResListProduct[]>) => {
          dispatch(
            this.action.listProduct({
              loading: false,
              data: res.data.response_data,
              paginated_data: res.data.paginated_data,
            }),
          );
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.action.listProduct({ loading: false, data: undefined }));
        });
    };
  }

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
  getAdminDetailProduct(id: string) {
    return (dispatch: Dispatch) => {
      dispatch(this.action.detailProduct({ loading: true, data: undefined }));
      this.httpService
        .GET(ENDPOINT.ADMIN_DETAIL_PRODUCT(id))
        .then((res: BaseResponse<IResDetailProduct>) => {
          dispatch(this.action.detailProduct({ loading: false, data: res.data.response_data }));
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.action.detailProduct({ loading: false, data: undefined }));
        });
    };
  }

  getDetailProduct(id: string) {
    return (dispatch: Dispatch) => {
      dispatch(this.action.detailProduct({ loading: true, data: undefined }));
      this.httpService
        .GET(ENDPOINT.DETAIL_PRODUCT(id))
        .then((res: BaseResponse<IResDetailProduct>) => {
          dispatch(this.action.detailProduct({ loading: false, data: res.data.response_data }));
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.action.detailProduct({ loading: false, data: undefined }));
        });
    };
  }
}
