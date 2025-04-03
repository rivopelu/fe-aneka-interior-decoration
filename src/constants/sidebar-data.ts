import { MdDashboard, MdInventory } from 'react-icons/md';
import { ROUTES } from '../routes/routes';
import { ISideBarMenuList } from '../types/type/ISidebarMenuList';

export const sidebarData: ISideBarMenuList[] = [
  {
    path: ROUTES.ADMIN.DASHBOARD(),
    label: "Dashboard",
    icon: MdDashboard,
  },
  {
    path: ROUTES.ADMIN.PRODUCT(),
    label: "Produk",
    icon: MdInventory,
  },
];
