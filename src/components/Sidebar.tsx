import { MdDashboard } from 'react-icons/md';
import { sidebarData } from '../constants/sidebar-data';
import SidebarMenu from './SidebarMenu';
import { useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const firstPath = location.pathname.split('/')[2];
  return (
    <div className={' w-sidebar-width'}>
      <div className={'fixed top-0 h-screen border-r w-sidebar-width bg-white'}>
        <div className={'h-top-bar-height border-b px-4 flex items-center'}>
          <div className="flex items-center h-full text-xl  font-semibold  gap-2 text-primary-main">
            <MdDashboard className="-translate-y-[1px] text-3xl" />
            Admin Dashboard
          </div>
        </div>
        <div className={'p-4 grid gap-1'}>
          {sidebarData.map((item, i) => {
            const itemFirstPath = item.path && item?.path.split('/')[2];

            return (
              <SidebarMenu
                active={firstPath === itemFirstPath}
                key={i}
                icon={item.icon}
                label={item.label}
                path={item.path}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
