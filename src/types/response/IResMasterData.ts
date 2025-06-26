export interface IResMasterData {
  name: string;
  id: string;
  slug: string;
  sub_category?: IResMasterData[];
}
