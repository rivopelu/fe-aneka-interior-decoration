export interface IResDetailProduct {
  name: string;
  id: string;
  slug: string;
  description: string | null;
  category_name: string;
  category_id: string;
  category_slug: string;
  image: string;
  price: number;
  sub_category_id?: string;
  sub_category_name?: string;
  sub_category_slug?: string;
  created_date: Date;
}
