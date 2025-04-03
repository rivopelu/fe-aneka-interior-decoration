import { ACCOUNT_ROLE_ENUM } from '../../enums/account-role-enum.ts';

export interface IResGetMe {
  email: string;
  name: string;
  id: string;
  role: ACCOUNT_ROLE_ENUM;
  created_date: Date;
  profile_picture: string;
  created_by: string;
}
