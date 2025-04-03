import { Dispatch } from "redux";
import { ENDPOINT } from "../../constants/endpoint";
import { IResListProduct } from "../../types/response/IResListProduct";
import { BaseResponse, BaseResponsePaginated } from "../../types/response/IResModel";
import BaseActions from "../base-actions";
import { productSlice } from "../reducers/product.reducers";
import { IResMasterData } from "../../types/response/IResMasterData";

export class ProductAction extends BaseActions {
  private action = productSlice.actions
  listProduct(param?: string) {
    return async (dispatch: Dispatch) => {
      dispatch(this.action.listProduct({ loading: true, data: undefined }))
      await this.httpService.GET(ENDPOINT.LIST_PRODUCT() + (param || "")).then((res: BaseResponsePaginated<IResListProduct[]>) => {
        dispatch(this.action.listProduct({ loading: false, data: res.data.response_data, paginated_data: res.data.paginated_data, }))

      }).catch(e => {
        this.errorService.fetchApiError(e)
        dispatch(this.action.listProduct({ loading: false, data: undefined }))
      })
    }
  }

  listCategory() {
    return async (dispatch: Dispatch) => {
      dispatch(this.action.listCategory({ loading: true, data: undefined }))
      await this.httpService.GET(ENDPOINT.LIST_CATEGORY()).then((res: BaseResponse<IResMasterData[]>) => {
        dispatch(this.action.listCategory({ loading: false, data: res.data.response_data }))
      }).catch(e => {
        this.errorService.fetchApiError(e)
        dispatch(this.action.listCategory({ loading: false, data: undefined }))
      })
    }
  }
}