import PageContainer from '../../../components/PageContainer.tsx';
import { PageTitle } from '../../../components/PageTItle.tsx';
import { IBreadcrumbData } from '../../../types/type/IBreadcrumbData.ts';
import CardLoading from '../../../components/CardLoading.tsx';
import { Card, CardBody } from '../../../components/Card.tsx';
import Button from '../../../components/Button.tsx';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes.ts';
import { useAddressPage } from './useAddressPage.ts';
import DateHelper from '../../../helper/date-helper.ts';

export default function AddressPage() {
  const page = useAddressPage();
  const dateHelper = new DateHelper();
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
      <div className={'flex items-center justify-between'}>
        <PageTitle title={'Alamat pengiriman'} breadcrumb={breadcrumb} />
        {page.datalist.length > 0 ? (
          <Link to={ROUTES.NEW_ADDRESS()}>
            <Button>Tambah Alamat Pengriman</Button>
          </Link>
        ) : (
          <></>
        )}
      </div>
      {page.loading ? (
        <CardLoading />
      ) : (
        <>
          {page.datalist.length === 0 ? (
            emptyState()
          ) : (
            <div className={'grid gap-3'}>
              {page.datalist.map((item, i) => (
                <Card key={i}>
                  <CardBody>
                    <div className={'text-gray-400'}>{item.destination_code}</div>
                    <div>{`${item.province}, ${item.city}, ${item.subdistrict}`}</div>
                    <div
                      className={'text-gray-400 mt-2'}
                    >{`dibuat tanggal ${dateHelper.toFormatDate(new Date(item.created_date), 'dd LLLL, yyyy - HH:mm')}`}</div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </PageContainer>
  );
}
