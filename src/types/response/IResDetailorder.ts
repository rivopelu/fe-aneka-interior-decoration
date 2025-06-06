import { ORDER_STATUS_ENUM } from '../../enums/order-status-enum';
import { IResListProduct } from './IResListProduct';
import { IResListShippingAddress } from './IResListShippingAddress';

export interface IResDetailOrder {
  delivery_cost: number;
  id: string;
  delivery_service_name: string;
  delivery_service_description: string;
  delivery_service_estimated: string;
  total_payment: number;
  created_date: string;
  total_for_goods_payment: number;
  delivery_address: IResListShippingAddress;
  status: ORDER_STATUS_ENUM;
  products: IResOrderProduct[];
  payment_image_url: string;
  reject_reason: string;
  account_id: string;
  account_name: string;
  account_profile_picture: string;
  account_email: string;
  delivery_code: string;
}

export interface IResOrderProduct extends IResListProduct {
  qty?: number;
  total_price?: number;
  price_per_qty?: number;
}
