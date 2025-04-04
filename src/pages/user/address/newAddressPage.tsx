import PageContainer from '../../../components/PageContainer.tsx';
import { PageTitle } from '../../../components/PageTItle.tsx';
import { IBreadcrumbData } from '../../../types/type/IBreadcrumbData.ts';
import { ROUTES } from '../../../routes/routes.ts';
import { Card, CardBody, CardTitle } from '../../../components/Card.tsx';
import Divider from '../../../components/Divider.tsx';
import InputText from '../../../components/InputText.tsx';
import InputTextArea from '../../../components/InputTextarea.tsx';
import Grid from '../../../components/Grid.tsx';
import Button from '../../../components/Button.tsx';
import { useNewAddressPage } from './useNewAddressPage.ts';
import { FormikProvider } from 'formik';
import { CircularLoading } from '../../../components/CircularLoading.tsx';

export default function NewAddressPage() {
  const page = useNewAddressPage();
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
      path: ROUTES.ADDRESS(),
    },
    {
      label: 'Buat Alamat Pengiriman',
    },
  ];
  return (
    <PageContainer className={'mt-10'}>
      <PageTitle title={'Alamat pengiriman'} breadcrumb={breadcrumb} />
      <Card>
        <CardBody>
          <CardTitle title={'Masukan data alamat pengiriman'} />
        </CardBody>
        <Divider />
        <CardBody>
          <FormikProvider value={page.formik}>
            <Grid gap={'xl'}>
              <InputText id={'city_query'} name={'city_query'} label={'Kota'} placeholder={'Cari kota tujuan'} />
              {page.loadingCity && (
                <div className={'flex items-center w-full justify-center'}>
                  <CircularLoading />
                </div>
              )}
              <div className={'grid gap-3 grid-cols-3'}>
                {page.formik.values.city_query &&
                  page.listDestination.length > 0 &&
                  page.listDestination.map((item, i) => (
                    <div key={i} onClick={() => page.selectedDestination(item)}>
                      <Card className={'hover:border-primary-main cursor-pointer active:bg-primary-50 duration-200'}>
                        <CardBody>
                          <div>{`${item.province}, ${item.city}, ${item.subdistrict}`}</div>
                        </CardBody>
                      </Card>
                    </div>
                  ))}
              </div>
              <InputTextArea id={'address'} name={'address'} label={'Detail Alamat'} placeholder={'Detail alamat'} />
              <Button loading={page.loadingSubmit} onClick={() => page.formik.handleSubmit()}>
                SIMPAN
              </Button>
            </Grid>
          </FormikProvider>
        </CardBody>
      </Card>
    </PageContainer>
  );
}
