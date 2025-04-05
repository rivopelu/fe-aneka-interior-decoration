import PageContainer from '../../../components/PageContainer.tsx';
import { PageTitle } from '../../../components/PageTItle.tsx';
import { useCartPage } from './useCartPage.ts';
import { Card, CardBody } from '../../../components/Card.tsx';
import { NumberFormatterHelper } from '../../../helper/number-format-helper.ts';
import QuantityButton from '../../../components/QuantityButton.tsx';
import { MdDelete } from 'react-icons/md';
import Button, { LinkButton } from '../../../components/Button.tsx';
import CardLoading from '../../../components/CardLoading.tsx';
import Divider from '../../../components/Divider.tsx';
import { CircularLoading } from '../../../components/CircularLoading.tsx';
import { twMerge } from 'tailwind-merge';
import { ROUTES } from '../../../routes/routes.ts';
import PopupModal from '../../../components/PopupModal.tsx';
import { checkDeliveryImage } from '../../../utils/check-delivery-image.ts';
import AlertBar from '../../../components/AlertBar.tsx';
import PopupQuestion from '../../../components/PopupQuestion.tsx';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const page = useCartPage();
  const numberFormat = new NumberFormatterHelper();

  function componentModal() {
    return (
      <Card>
        <CardBody>
          <div className={'grid gap-4'}>
            {page.listDeliveryService &&
              page.listDeliveryService.map((e, i) => {
                const image = checkDeliveryImage(e.service_name);
                return (
                  <div
                    key={i}
                    onClick={() =>
                      page.setSelectedDeliveryService((v) =>
                        v ? (v.service_name === e.service_name ? undefined : e) : e,
                      )
                    }
                  >
                    <Card
                      className={twMerge(
                        'hover:border-primary-main cursor-pointer active:bg-primary-50 duration-200',
                        page.selectedDeliveryService?.service_name === e.service_name &&
                          'bg-primary-100 border-primary-main',
                      )}
                    >
                      <CardBody>
                        <div className={'flex gap-4 items-center '}>
                          <div className={'flex items-center gap-3 flex-1'}>
                            {image && <img className={'w-16 h-fit'} src={image} alt={e.service_name} />}
                            <div>
                              <div className={'font-semibold'}>{e.service_name}</div>
                              <div>{e.description}</div>
                              <p>{e.estimated}</p>
                            </div>
                          </div>
                          <div className={'text-end pl-24 font-semibold'}>{numberFormat.toRupiah(e.cost)}</div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                );
              })}
            <Button onClick={() => page.setListDeliveryService(undefined)} disable={!page.selectedDeliveryService}>
              Pilih
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }

  function componentModalPayment() {
    return (
      <Card>
        <CardBody className={'text-center flex flex-col items-center justify-center gap-3'}>
          <div className={'text-2xl font-semibold'}>Pesanan Kamu berhasil dibuat</div>
          <p>Silahkan tranfer ke rekening di bawah ini dan upload bukti pembayaran di detail pesanan</p>
          <p className={'text-2xl text-primary-dark'}>080808080</p>
          <p>
            Bank BCA, An <strong>Nama penerima</strong>
          </p>
          <p>
            Jumlah yang haru dibayuar{' '}
            <strong>{numberFormat.toRupiah(page.totalPrice + (page?.selectedDeliveryService?.cost || 0))}</strong>
          </p>
          <Button fullWidth className={'mt-4'} onClick={() => navigate(ROUTES.MY_ORDER())}>
            Lihat Pesanan
          </Button>
        </CardBody>
      </Card>
    );
  }

  const navigate = useNavigate();
  return (
    <PageContainer className={'mt-8'}>
      <PopupModal
        component={componentModalPayment()}
        open={page.showModalPayment}
        onClose={() => {
          page.setShowModalPayment(false);
          navigate(ROUTES.MY_ORDER());
        }}
      />
      <PopupQuestion
        loading={page.loadingCreateOrder}
        onSubmit={page.onSubmitCreateOrder}
        title={'Buat order sekarang ? '}
        open={page.openModalCreateOrder}
        onClose={() => page.setOpenModalCreateOrder(false)}
      />
      <PopupModal
        onClose={() => {
          page.setSelectedDeliveryService(undefined);
          page.setListDeliveryService(undefined);
        }}
        open={!!page.listDeliveryService}
        component={componentModal()}
      />
      <PageTitle title={`Keranjang (${page?.countCart || '0'} item)`} />
      {page.loading ? (
        <CardLoading />
      ) : (
        <div className={'flex gap-2 relative'}>
          <div className={'flex-1 grid gap-2'}>
            {page.listCart.map((item) => (
              <Card className={'h-fit'} key={item.cart_id}>
                <CardBody>
                  <div className={'flex gap-3'}>
                    <img src={item.image} alt={item.name} className={'h-32 aspect-square object-cover'} />
                    <div className={'flex flex-col gap-1 justify-between flex-1'}>
                      <div className={'flex justify-between w-full'}>
                        <div>
                          <h1 className={' text-2xl'}>{item.name}</h1>
                          <p className={'text-gray-400'}>
                            {numberFormat.toRupiah(item.price_per_qty)} x {item.qty}
                          </p>
                        </div>
                        <Button
                          onClick={() => page.removeCart(item.cart_id)}
                          variant={'outlined'}
                          color={'error'}
                          startIcon={<MdDelete />}
                        >
                          Hapus
                        </Button>
                      </div>
                      <div className={'flex items-center gap-2'}>
                        <div className={'w-40'}>
                          <QuantityButton
                            quantity={item.qty}
                            onAddQty={() => page.onAddQty(item.cart_id)}
                            onReduceQty={() => page.onReduceQty(item.cart_id)}
                          />
                        </div>
                        <div>{numberFormat.toRupiah(item.total_price)}</div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className={'grid h-fit gap-2'}>
            <Card className={'w-md h-fit'}>
              <CardBody>
                <h1 className={'text-2xl '}>Ringkasan Belanja</h1>
              </CardBody>
              <Divider />
              <CardBody className={'grid gap-6'}>
                <div>
                  <div className={'text-gray-600 '}>Total Belanja</div>
                  <h1 className={'text-xl '}>{numberFormat.toRupiah(page.totalPrice)}</h1>
                </div>
                {page.selectedDeliveryService && (
                  <div>
                    <div className={'text-gray-600 '}>Biaya Pengiriman</div>
                    <h1 className={'text-xl '}>{numberFormat.toRupiah(page.selectedDeliveryService.cost)}</h1>
                  </div>
                )}
                {page.selectedDeliveryService && (
                  <div>
                    <div className={'text-gray-600 '}>Akumulasi total</div>
                    <h1 className={'text-3xl '}>
                      {numberFormat.toRupiah(page.totalPrice + page.selectedDeliveryService.cost)}
                    </h1>
                  </div>
                )}
                <div className={'grid gap-3'}>
                  {!page.selectedDeliveryService && <AlertBar title={'Silahkan pilih jasa pengiriman'} />}
                  <Button disable={!page.selectedDeliveryService} fullWidth onClick={page.onClickBuyNow}>
                    BELI
                  </Button>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className={'grid gap-4'}>
                  <div className={'flex items-center justify-between'}>
                    <div>Alamat pengiriman</div>
                    <LinkButton href={ROUTES.ADDRESS()}>Ubah Alamat</LinkButton>
                  </div>
                  {page.loadingAddress ? (
                    <div className={'h-32 flex items-center justify-center'}>
                      <CircularLoading />
                    </div>
                  ) : (
                    <div className={'grid gap-3'}>
                      {page.listAddress.map((item, i) => (
                        <div key={i} onClick={() => page.setSelectedAddress(item)}>
                          <Card
                            className={twMerge(
                              'hover:border-primary-200 cursor-pointer  duration-200 active:bg-primary-50',
                              page.selectedAddress?.destination_code === item.destination_code &&
                                'border-primary-main bg-primary-100 text-primary-dark',
                            )}
                          >
                            <CardBody>
                              <div>{`${item.province}, ${item.city}, ${item.subdistrict}`}</div>
                            </CardBody>
                          </Card>
                        </div>
                      ))}
                    </div>
                  )}
                  <Button
                    loading={page.loadingCheckDelivery}
                    onClick={page.onCheckDeliveryFee}
                    disable={!page.selectedAddress}
                    variant={'outlined'}
                  >
                    Cek Biaya Pengiriman
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
