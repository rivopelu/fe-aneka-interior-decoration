import PageContainer from '../../../components/PageContainer.tsx';
import { PageTitle } from '../../../components/PageTItle.tsx';
import { IBreadcrumbData } from '../../../types/type/IBreadcrumbData.ts';
import CardLoading from '../../../components/CardLoading.tsx';
import { Card, CardBody } from '../../../components/Card.tsx';
import Button from '../../../components/Button.tsx';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes.ts';

export default function AddressPage() {
  const breadcrumb: IBreadcrumbData[] = [
    {
      label: 'Beranda',
      path: '/',
    },
    {
      label: 'Profil',
      path: '/',
    },
    {
      label: 'Alamat Pengiriman',
    },
  ];

  function emptyState() {
    return (
      <Card>
        <CardBody>
          <div className={'h-52 flex items-center justify-center flex-col gap-4'}>
            <h1>Kamu belum mempunyai alamat pengiriman</h1>
            <Link to={ROUTES.NEW_ADDRESS()}>
              <Button startIcon={<MdAdd />}>Buat alamat pengiriman</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <PageContainer className={'mt-10'}>
      <PageTitle title={'Alamat pengiriman'} breadcrumb={breadcrumb} />
      {emptyState()}
      <CardLoading />
    </PageContainer>
  );
}
