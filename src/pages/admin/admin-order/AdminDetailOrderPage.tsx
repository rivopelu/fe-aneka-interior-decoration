import PageContainer from '../../../components/PageContainer.tsx';
import { useAdminDetailOrderPage } from './useAdminDetailOrderPage.ts';
import CardLoading from '../../../components/CardLoading.tsx';
import { PageTitle } from '../../../components/PageTItle.tsx';
import { ORDER_STATUS_ENUM } from '../../../enums/order-status-enum.ts';
import { Card, CardBody, CardTitle } from '../../../components/Card.tsx';
import Stepper from '../../../components/Stepper.tsx';
import OrderStatusText from '../../../components/OrderStatusText.tsx';
import DateHelper from '../../../helper/date-helper.ts';
import { NumberFormatterHelper } from '../../../helper/number-format-helper.ts';
import Divider from '../../../components/Divider.tsx';
import Avatar from '../../../components/Avatar.tsx';
import PopupModal from '../../../components/PopupModal.tsx';
import { FormikProvider } from 'formik';
import InputTextArea from '../../../components/InputTextarea.tsx';
import IconButton from '../../../components/IconButton.tsx';
import { MdClose } from 'react-icons/md';
import Button from '../../../components/Button.tsx';
import Grid from '../../../components/Grid.tsx';
import AlertBar from '../../../components/AlertBar.tsx';
import { checkActiveStepOrder } from '../../../utils/check-stepper-order.ts';
import InputText from '../../../components/InputText.tsx';

export default function AdminDetailOrderPage() {
  const page = useAdminDetailOrderPage();
  const dateHelper = new DateHelper();
  const numberFormat = new NumberFormatterHelper();

  function componentModalInputResi() {
    return (
      <Card className={'w-md'}>
        <CardBody>
          <div className={'flex items-center justify-between'}>
            <CardTitle title={'Input resi pengiriman'} />
            <IconButton onClick={() => page.setShowModalResi(false)}>
              <MdClose />
            </IconButton>
          </div>
        </CardBody>
        <CardBody>
          <FormikProvider value={page.formikResi}>
            <InputText id={'resi'} name={'resi'} label={'Resi pengiriman'} placeholder={'Masukan resi pengiriman'} />
          </FormikProvider>
        </CardBody>
        <Divider />
        <CardBody>
          <Button
            loading={page.loadingInputResi}
            onClick={() => page.formikResi.handleSubmit()}
            disable={!page.formikResi.values.resi}
            fullWidth
          >
            KIRIM
          </Button>
        </CardBody>
      </Card>
    );
  }

  function componentRejectModal() {
    return (
      <Card className={'w-md'}>
        <CardBody>
          <div className={'flex items-center justify-between'}>
            <CardTitle title={'Tolak Pesanan'} />
            <IconButton onClick={page.onCloseModalReject}>
              <MdClose />
            </IconButton>
          </div>
        </CardBody>
        <Divider />
        <CardBody>
          <FormikProvider value={page.formikReject}>
            <InputTextArea
              id={'reason'}
              name={'reason'}
              label={'Alasan penolakan'}
              placeholder={'Masukan alasan untuk menolak pesanan'}
            />
          </FormikProvider>
        </CardBody>
        <Divider />
        <CardBody>
          <Button loading={page.loadingApproveReject} onClick={() => page.formikReject.handleSubmit()} fullWidth>
            KIRIM
          </Button>
        </CardBody>
      </Card>
    );
  }
  return (
    <PageContainer>
      <PopupModal onClose={page.onCloseModalReject} component={componentRejectModal()} open={page.showModalReject} />
      <PopupModal
        onClose={() => page.setShowModalResi(false)}
        component={componentModalInputResi()}
        open={page.showModalResi}
      />
      <div className={'flex items-center justify-between'}>
        <PageTitle title={'Detail Pesanan'} />
        {page?.data?.status && (
          <div>
            <OrderStatusText status={page.data.status} />
          </div>
        )}
      </div>
      {page.loading ? (
        <CardLoading />
      ) : (
        <>
          {page.data && (
            <div className={'grid gap-4'}>
              {page.data && page.data.status !== ORDER_STATUS_ENUM.REJECTED && (
                <Card>
                  <CardBody>
                    <Stepper
                      data={[
                        'Order Dibuat',
                        'Pembayaran',
                        'Menunggu Konfirmasi',
                        'Pesanan diproses',
                        'Dalam Pengiriman',
                        'selesai',
                      ]}
                      activeStepIndex={checkActiveStepOrder(page.data.status)}
                    />
                  </CardBody>
                </Card>
              )}

              {page.data && page.data.status === ORDER_STATUS_ENUM.REJECTED && (
                <AlertBar
                  variant={'error'}
                  title={'Pesanan di tolak'}
                  description={`pesanan di tolak karena ${page?.data?.reject_reason || ''}`}
                />
              )}
              <div className="flex gap-3">
                <div className="grid gap-3  w-xl">
                  <Card>
                    <CardBody>Detail Pemesan</CardBody>
                    <Divider />
                    <CardBody>
                      <div className={'flex items-center gap-4'}>
                        <Avatar size={'sm'} src={page.data.account_profile_picture} name={page.data.account_name} />
                        <div>
                          <p>{page.data.account_name}</p>
                          <p className={'text-gray-400'}>{page.data.account_email}</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  <Card className="w-full h-fit">
                    <CardBody>
                      <div className="grid gap-3">
                        <div className="flex justify-between">
                          <p className=" text-gray-500">Order ID</p>
                          <p className="text-primary-main">{page.data.id}</p>
                        </div>
                        {page.data.created_date && (
                          <div className="flex justify-between">
                            <p className=" text-gray-500">Tanggal dibuat</p>
                            <p className="">
                              {dateHelper.toFormatDate(new Date(page.data.created_date), 'dd LLLL, yyyy - HH:mm')}
                            </p>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <p className=" text-gray-500">Biaya Pengiriman</p>
                          <p className="">{numberFormat.toRupiah(page.data.delivery_cost)}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className=" text-gray-500">Biaya Belanja</p>
                          <p className="">{numberFormat.toRupiah(page.data.total_for_goods_payment)}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className=" text-gray-500">Total Biaya pesanan</p>
                          <p className="font-semibold">{numberFormat.toRupiah(page.data.total_payment)}</p>
                        </div>
                        {page.data.status === ORDER_STATUS_ENUM.ON_DELIVERY && (
                          <div className="flex justify-between">
                            <p className=" text-gray-500">Resi Pengiriman</p>
                            <p className="font-semibold">{page.data.delivery_code}</p>
                          </div>
                        )}
                      </div>
                    </CardBody>
                    {page.data.status === ORDER_STATUS_ENUM.IN_PROGRESS && (
                      <>
                        <Divider />
                        <CardBody>
                          <Button onClick={() => page.setShowModalResi(true)} fullWidth>
                            Input resi pengiriman
                          </Button>
                        </CardBody>
                      </>
                    )}
                  </Card>
                  <Card>
                    <CardBody>
                      <div className="grid gap-3">
                        <div>Detail Pengiriman</div>
                        <div className="flex justify-between">
                          <p className=" text-gray-500">Layanan pengiriman sicepat</p>
                          <div className="text-end">
                            <p className="">{page?.data?.delivery_service_name}</p>
                            <p className="text-xs lowercase">{page?.data?.delivery_service_description}</p>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <p className=" text-gray-500">Estimasi Pengiriman</p>
                          <p className="">{page?.data?.delivery_service_estimated}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className=" text-gray-500">Alamat Pengiriman</p>
                          <p className="text-xs text-end">{`${page?.data?.delivery_address.address}, ${page?.data?.delivery_address.subdistrict}, ${page?.data?.delivery_address.city}, ${page?.data?.delivery_address.province} (${page?.data?.delivery_address.destination_code})`}</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  {page.data.status !== ORDER_STATUS_ENUM.WAITING_PAYMENT && (
                    <Card>
                      <CardBody>
                        <h1>Bukti pembayaran</h1>
                      </CardBody>
                      <Divider />
                      <CardBody className="w-full flex items-center justify-center ">
                        <img
                          className="h-52 border rounded-md"
                          src={page.data.payment_image_url}
                          alt="bukti pembayaran"
                        />
                      </CardBody>
                      <>
                        {page.data.status === ORDER_STATUS_ENUM.PENDING && (
                          <>
                            <Divider />
                            <CardBody>
                              <Grid grid={2}>
                                <Button onClick={() => page.setShowModalReject(true)} color={'error'}>
                                  Tolak
                                </Button>
                                <Button
                                  onClick={page.onApproveOrder}
                                  loading={page.loadingApproveReject}
                                  color={'info'}
                                >
                                  Terima
                                </Button>
                              </Grid>
                            </CardBody>
                          </>
                        )}
                      </>
                    </Card>
                  )}
                </div>
                <Card className="flex-1 h-fit">
                  <CardBody>
                    <p className="uppercase ">Produk yang dibeli</p>
                  </CardBody>
                  <Divider />
                  <CardBody>
                    <div className="grid gap-3">
                      {page.data.products.map((e) => {
                        return (
                          <div className="flex gap-3">
                            <img
                              alt={e.name}
                              src={e.image}
                              className="aspect-square rounded-md border object-cover h-24"
                            />
                            <div>
                              <p className="text-xl">{e.name}</p>
                              <p className="line-clamp-1 text-gray-400 text-xs">{e.description}</p>
                              <p className="text-gray-500 text-xs">
                                {numberFormat.toRupiah(e.price_per_qty)} X {e.qty} Item
                              </p>
                              <p className="text-primary-main text-xl">{numberFormat.toRupiah(e.total_price)}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          )}
        </>
      )}
    </PageContainer>
  );
}
