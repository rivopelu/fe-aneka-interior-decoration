import AlertBar from '../../../components/AlertBar';
import Button from '../../../components/Button';
import { Card, CardBody } from '../../../components/Card';
import CardLoading from '../../../components/CardLoading';
import Divider from '../../../components/Divider';
import PageContainer from '../../../components/PageContainer';
import { PageTitle } from '../../../components/PageTItle';
import Stepper from '../../../components/Stepper';
import UploadBoxCropperArea from '../../../components/UploadBoxCropper';
import { ORDER_STATUS_ENUM } from '../../../enums/order-status-enum';
import DateHelper from '../../../helper/date-helper';
import { NumberFormatterHelper } from '../../../helper/number-format-helper';
import { ROUTES } from '../../../routes/routes';
import { IBreadcrumbData } from '../../../types/type/IBreadcrumbData';
import { useDetailMyOrderPage } from './useDetailMyOrderPage';
import { checkActiveStepOrder } from '../../../utils/check-stepper-order.ts';
import OrderStatusText from '../../../components/OrderStatusText.tsx';

export default function DetailMyOrderPage() {
  const page = useDetailMyOrderPage();
  const dateHelper = new DateHelper();
  const numberFormat = new NumberFormatterHelper();
  const breadcrumb: IBreadcrumbData[] = [
    {
      label: 'Beranda',
      path: '/',
    },
    {
      label: 'Pesanan',
      path: ROUTES.MY_ORDER(),
    },
    {
      label: page.data?.id || '',
    },
  ];

  return (
    <PageContainer className="my-8">
      <div className={'flex items-center justify-between'}>
        <PageTitle breadcrumb={breadcrumb} />
        {page?.data && page.data.status === ORDER_STATUS_ENUM.ON_DELIVERY ? (
          <div>
            <Button loading={page.loadingConfirm} onClick={page.onConfirmOrder}>
              Konfirmasi Pesanan
            </Button>
          </div>
        ) : (
          <OrderStatusText status={page?.data?.status} />
        )}
      </div>
      <div>
        {page.loading ? (
          <CardLoading />
        ) : (
          <>
            {page.data && (
              <div className="grid gap-5">
                {page.data && page.data.status === ORDER_STATUS_ENUM.REJECTED && (
                  <AlertBar
                    variant={'error'}
                    title={'Pesanan di tolak'}
                    description={`pesanan kamu ditolak karena ${page?.data?.reject_reason || ''}`}
                  />
                )}
                {page.data.status === ORDER_STATUS_ENUM.WAITING_PAYMENT && (
                  <AlertBar
                    description="Silahkan selesaikan pembayaran, setelah itu upload bukti pembayaran untuk mengkonfirmasi pesanan"
                    title="Silahkan selesaikan pembayaran"
                  />
                )}

                {page.data.status !== ORDER_STATUS_ENUM.REJECTED && (
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
                <div className="flex gap-3">
                  <div className="grid gap-3  w-xl">
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
                    {page.data.status === ORDER_STATUS_ENUM.WAITING_PAYMENT && (
                      <Card>
                        <CardBody>
                          <h1>Upload Bukti pembayaran</h1>
                        </CardBody>
                        <Divider />
                        <CardBody>
                          <UploadBoxCropperArea
                            value={page.uploadPaymentImageUrl}
                            folderName="payment"
                            onChange={(e) => page.setUploadPaymentImageUrl(e)}
                          />
                          <Button
                            loading={page.loadingSubmitImage}
                            onClick={page.onSubmitPayment}
                            disable={!page.uploadPaymentImageUrl}
                            fullWidth
                            className="mt-4"
                          >
                            KIRIM
                          </Button>
                        </CardBody>
                      </Card>
                    )}
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
      </div>
    </PageContainer>
  );
}
