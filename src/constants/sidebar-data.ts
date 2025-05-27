import { MdCategory, MdDashboard, MdGroups, MdInventory, MdMenu } from 'react-icons/md';
import { ROUTES } from '../routes/routes';
import { ISideBarMenuList } from '../types/type/ISidebarMenuList';

export const sidebarData: ISideBarMenuList[] = [
  {
    path: ROUTES.ADMIN.DASHBOARD(),
    label: 'Dashboard',
    icon: MdDashboard,
  },
  {
    path: ROUTES.ADMIN.PRODUCT(),
    label: 'Produk',
    icon: MdInventory,
  },
  {
    path: ROUTES.ADMIN.CATEGORY(),
    label: 'Kategory',
    icon: MdCategory,
  },
  {
    path: ROUTES.ADMIN.ORDER(),
    label: 'Pesanan',
    icon: MdMenu,
  },
  {
    path: ROUTES.ADMIN.ACCOUNT(),
    label: 'Akun',
    icon: MdGroups,
  },
];
