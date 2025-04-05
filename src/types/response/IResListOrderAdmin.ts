import { ORDER_STATUS_ENUM } from '../../enums/order-status-enum.ts';
import { IResListShippingAddress } from './IResListShippingAddress.ts';

export interface IResListOrderAdmin {
  id: string;
  created_date: Date;
  status: ORDER_STATUS_ENUM;
  total_payment: number;
  delivery_service_name: string;
  delivery_service_description: string;
  delivery_service_estimated: string;
  delivery_address: IResListShippingAddress;
  account_id: string;
  account_name: string;
  account_profile_picture: string;
  account_email: string;
}
