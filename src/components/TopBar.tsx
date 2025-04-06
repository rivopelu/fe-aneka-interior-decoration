import PageContainer from './PageContainer.tsx';
import BrandLogo from './BrandLogo.tsx';
import { useAuth } from '../hooks/useAuth.ts';
import Button from './Button.tsx';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes/routes.ts';
import Dropdown from './Dropdown.tsx';
import Avatar from './Avatar.tsx';
import { ListGroup, ListItem } from './List.tsx';
import { MdDashboard, MdLocalShipping, MdLogout, MdShop, MdShoppingBag } from 'react-icons/md';
import { ACCOUNT_ROLE_ENUM } from '../enums/account-role-enum.ts';
import IconButton from './IconButton.tsx';
import Tooltip from './Tooltip.tsx';
import BadgeIcon from './BadgeIcon.tsx';
import { useAppDispatch, useAppSelector } from '../redux/store.ts';
import { CartAction } from '../redux/actions/cart.action.ts';
import { useEffect } from 'react';
import GlobalSearch from './GlobalSearch.tsx';

export default function TopBar() {
  const dispatch = useAppDispatch();
  const cartAction = new CartAction();
  const Cart = useAppSelector((state) => state.Cart);
  const auth = useAuth();
  const user = auth.user;

  useEffect(() => {
    if (auth.user) {
      dispatch(cartAction.getCount()).then();
    }
  }, [auth.user]);

  return (
    <div className={'bg-gradient-to-b h-top-home-height from-primary-700 to-primary-600'}>
      <PageContainer className={'h-full '}>
        <div className={'grid grid-cols-3 h-full'}>
          <div className={'flex items-center'}>
            <BrandLogo type={'light'} />
          </div>
          <div className={'flex-1 my-auto items-center'}>
            <GlobalSearch />
          </div>
          <div className={'flex justify-end items-center'}>
            {user ? (
              <div className={'flex items-center gap-8'}>
                <Tooltip content={'Keranjang'} position={'bottom'}>
                  <Link to={ROUTES.CART()}>
                    <BadgeIcon count={Cart?.countCart?.data}>
                      <IconButton className={'active:bg-gray-100 rounded-full'}>
                        <MdShoppingBag className={'text-primary-main '} />
                      </IconButton>
                    </BadgeIcon>
                  </Link>
                </Tooltip>
                <Dropdown toggle={<Avatar size={'sm'} src={user.profile_picture} name={user.name} />}>
                  <ListGroup>
                    {user.role === ACCOUNT_ROLE_ENUM.ADMIN && (
                      <Link to={ROUTES.ADMIN.DASHBOARD()}>
                        <ListItem label={'Dashboard'} icon={<MdDashboard />} />
                      </Link>
                    )}
                    <Link to={ROUTES.ADDRESS()}>
                      <ListItem label={'Alamat'} icon={<MdLocalShipping />} />
                    </Link>
                    <Link to={ROUTES.MY_ORDER()}>
                      <ListItem label={'Pesanan'} icon={<MdShop />} />
                    </Link>
                    <ListItem onClick={auth.logOut} className={'text-red-600'} label={'Logout'} icon={<MdLogout />} />
                  </ListGroup>
                </Dropdown>
              </div>
            ) : (
              <div className={'gap-3 flex'}>
                <Link to={ROUTES.SIGN_UP()}>
                  <Button variant={'outlined'} color={'white'}>
                    Daftar
                  </Button>
                </Link>
                <Link to={ROUTES.SIGN_IN()}>
                  <Button color={'white'}>Masuk</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
