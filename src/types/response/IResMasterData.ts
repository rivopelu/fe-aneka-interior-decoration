export interface IResMasterData {
  name: string;
  id: string;
  slug: string;
  sub_category?: IResSubCategory[];
}

export interface IResSubCategory {
  id: string;
  name: string;
  slug: string;
  category_id: string;
}
