import { PAGE_TYPE_ENUM } from '../enums/page-type-enum.ts';
import HomePage from '../pages/HomePage.tsx';
import SignInPage from '../pages/auth/SignInPage.tsx';
import SignUpPage from '../pages/auth/SignUpPage.tsx';
import DashboardPage from '../pages/admin/dasbboard/DashboardPage.tsx';
import { IRouteList } from '../types/type/IRouteList.ts';
import { ROUTES } from './routes.ts';
import AdminProductPage from '../pages/admin/admin-product/AdminProductPage.tsx';
import NewProductPage from '../pages/admin/admin-product/NewProductPage.tsx';
import detailProductPage from '../pages/user/detail-product/DetailProductPage.tsx';
import CartPage from '../pages/user/cart/CartPage.tsx';
import AddressPage from '../pages/user/address/AddressPage.tsx';
import NewAddressPage from '../pages/user/address/newAddressPage.tsx';
import { MyOrderPage } from '../pages/user/my-order/MyOrderPage.tsx';
import DetailMyOrderPage from '../pages/user/my-order/DetailMyOrderPage.tsx';

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
  {
    route: ROUTES.DETAIL_PRODUCT(':id'),
    type: PAGE_TYPE_ENUM.PRIMARY,
    elements: detailProductPage,
  },
];

export const userRouteList: IRouteList[] = [
  {
    route: ROUTES.MY_ORDER(),
    type: PAGE_TYPE_ENUM.PRIMARY,
    elements: MyOrderPage,
  },
  {
    route: ROUTES.DETAIL_MY_ORDER(":id"),
    type: PAGE_TYPE_ENUM.PRIMARY,
    elements: DetailMyOrderPage,
  },
  {
    route: ROUTES.CART(),
    type: PAGE_TYPE_ENUM.PRIMARY,
    elements: CartPage,
  },
  {
    route: ROUTES.ADDRESS(),
    type: PAGE_TYPE_ENUM.PRIMARY,
    elements: AddressPage,
  },
  {
    route: ROUTES.NEW_ADDRESS(),
    type: PAGE_TYPE_ENUM.PRIMARY,
    elements: NewAddressPage,
  },
];

export const adminRouteList: IRouteList[] = [
  {
    route: ROUTES.ADMIN.DASHBOARD(),
    type: PAGE_TYPE_ENUM.DASHBOARD,
    elements: DashboardPage,
  },
  {
    route: ROUTES.ADMIN.PRODUCT(),
    type: PAGE_TYPE_ENUM.DASHBOARD,
    elements: AdminProductPage,
  },
  {
    route: ROUTES.ADMIN.NEW_PRODUCT(),
    type: PAGE_TYPE_ENUM.DASHBOARD,
    elements: NewProductPage,
  },
];
