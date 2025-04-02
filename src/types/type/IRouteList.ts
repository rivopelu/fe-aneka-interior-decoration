import { PAGE_TYPE_ENUM } from '../../enums/page-type-enum.ts';
import { JSX } from 'react';
import { PRIVILEGE_ACCESS } from '../../enums/privilege.ts';

export interface IRouteList {
  route: string;
  elements: () => JSX.Element;
  type: PAGE_TYPE_ENUM;
  privilege?: PRIVILEGE_ACCESS;
}
