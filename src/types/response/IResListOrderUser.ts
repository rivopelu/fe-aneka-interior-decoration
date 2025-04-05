import { ORDER_STATUS_ENUM } from "../../enums/order-status-enum";

export interface IResListOrderUser {
  id: string;
  created_date: string;
  status: ORDER_STATUS_ENUM;
  total_payment: number;
  delivery_service_name: string;
  delivery_service_description: string;
  delivery_service_estimated: string;
  delivery_address: {
    destination_code: string;
    city: string;
    subdistrict: string;
    province: string;
    address: string;
    id: string;
    created_date: string;
  };
}
