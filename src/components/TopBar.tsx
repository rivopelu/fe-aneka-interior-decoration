import PageContainer from './PageContainer.tsx';
import BrandLogo from './BrandLogo.tsx';
import { useAuth } from '../hooks/useAuth.ts';
import Button from './Button.tsx';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes/routes.ts';
import Dropdown from './Dropdown.tsx';
import Avatar from './Avatar.tsx';
import { ListGroup, ListItem } from './List.tsx';
import { MdLogout, MdPerson } from 'react-icons/md';

export default function TopBar() {
  const auth = useAuth();
  const user = auth.user;
  return (
    <div className={'bg-gradient-to-b h-top-home-height from-primary-700 to-primary-600'}>
      <PageContainer className={'h-full '}>
        <div className={'grid grid-cols-3 h-full'}>
          <div className={'flex items-center'}>
            <BrandLogo type={'light'} />
          </div>
          <div className={'my-auto flex items-center justify-center bg-white h-fit'}>
            <div>SEARCH</div>
          </div>
          <div className={'flex justify-end items-center'}>
            {user ? (
              <div>
                <Dropdown toggle={<Avatar size={'sm'} src={user.profile_picture} name={user.name} />}>
                  <ListGroup>
                    <ListItem label={'Profile'} icon={<MdPerson />} />
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
