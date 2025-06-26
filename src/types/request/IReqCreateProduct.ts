export interface IReqCreateProduct {
  name: string;
  description: string;
  image_url: string;
  category_id: string;
  sub_category_id: string;
  price: number | null;
}
