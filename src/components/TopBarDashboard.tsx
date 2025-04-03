import { MdHome, MdLogout } from "react-icons/md";
import { useAuth } from "../hooks/useAuth";
import Avatar from "./Avatar";
import Dropdown from "./Dropdown";
import { ListGroup, ListItem } from "./List";
import PageContainer from "./PageContainer";
import { Link } from "react-router-dom";

export function TopBarDashboard() {

  const getGreeting = (): string => {
    const hours = new Date().getHours();

    if (hours < 12) {
      return `Selemat Page, `;
    } else if (hours < 18) {
      return `Selamat Siang, `;
    } else {
      return `Selamat Malam, `;
    }
  };

  const auth = useAuth()
  return (
    <div className={'h-top-bar-height bg-white border-b '}>
      <div className={'w-full h-full'}>
        <PageContainer className={'h-full flex justify-between  items-center'}>
          <div>
            {getGreeting()} <span className={'font-bold'}>{auth?.user?.name}</span>
          </div>
          <Dropdown
            toggle={
              <div>
                <Avatar src={auth?.user?.profile_picture} size={'sm'} name={auth?.user?.name} />
              </div>
            }
          >
            <ListGroup>
              <Link to={"/"}>
                <ListItem icon={<MdHome />} label={"Beranda"} />
              </Link>
              <ListItem icon={<MdLogout />} className="text-red-700" onClick={auth.logOut} label={"Logout"} />
            </ListGroup>
          </Dropdown>
        </PageContainer>
      </div>
    </div>
  )
}