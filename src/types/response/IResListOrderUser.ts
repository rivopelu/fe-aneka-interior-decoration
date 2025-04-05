export interface IResListOrderUser {
  id: string;
  created_date: string;
  status: string;
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
