import { PAGE_TYPE_ENUM } from '../enums/page-type-enum.ts';
import HomePage from '../pages/HomePage.tsx';
import SignInPage from '../pages/auth/SignInPage.tsx';
import SignUpPage from '../pages/auth/SignUpPage.tsx';
import DashboardPage from '../pages/dasbboard/DashboardPage.tsx';
import { IRouteList } from '../types/type/IRouteList.ts';
import { ROUTES } from './routes.ts';

export const RouteList: IRouteList[] = [
  {
    route: ROUTES.HOME(),
    type: PAGE_TYPE_ENUM.PRIMARY,
    elements: HomePage,
  },
  {
    route: ROUTES.SIGN_IN(),
    type: PAGE_TYPE_ENUM.FULL_PAGE,
    elements: SignInPage,
  },
  {
    route: ROUTES.SIGN_UP(),
    type: PAGE_TYPE_ENUM.FULL_PAGE,
    elements: SignUpPage,
  },
];

export const adminRouteList: IRouteList[] = [
  {
    route: ROUTES.ADMIN.DASHBOARD(),
    type: PAGE_TYPE_ENUM.DASHBOARD,
    elements: DashboardPage,
  },
]
