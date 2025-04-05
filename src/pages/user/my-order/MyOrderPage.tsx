import PageContainer from '../../../components/PageContainer.tsx';
import { useAppDispatch, useAppSelector } from '../../../redux/store.ts';
import { useEffect } from 'react';
import { OrderActions } from '../../../redux/actions/order.actions.ts';
import CardLoading from '../../../components/CardLoading.tsx';
import { Card, CardBody } from '../../../components/Card.tsx';
import { PageTitle } from '../../../components/PageTItle.tsx';
import DateHelper from '../../../helper/date-helper.ts';
import { NumberFormatterHelper } from '../../../helper/number-format-helper.ts';
import IconButton from '../../../components/IconButton.tsx';
import { MdInfo } from 'react-icons/md';

export function MyOrderPage() {
  const dispatch = useAppDispatch();
  const orderActions = new OrderActions();
  const Order = useAppSelector((state) => state.Order);
  const orderList = Order?.listOrderUser?.data || [];
  const loading = Order?.listOrderUser?.loading;
  const numberFormatHelper = new NumberFormatterHelper();
  const dateHelper = new DateHelper();
  useEffect(() => {
    dispatch(orderActions.getOrderUser());
  }, []);
  return (
    <PageContainer className={'mt-10'}>
      <PageTitle title={'Pesanan Kamu '} />
      {loading ? (
        <CardLoading />
      ) : (
        <div className={'grid gap-4'}>
          {orderList.map((item, i) => (
            <div key={i}>
              <Card>
                <CardBody>
                  <div className={'flex justify-between items-center'}>
                    <div className={'grid grid-cols-3 flex-1'}>
                      <div>
                        <div className={'font-semibold'}>{item.status}</div>
                        <div className={'text-gray-500'}>{item.id}</div>
                      </div>
                      <div>
                        <div className={'text-xs text-gray-500'}>Tanggal Pesanan dibuat</div>
                        <p>{dateHelper.toFormatDate(new Date(item.created_date), 'dd LLLL, yyyy - HH:mm')}</p>
                      </div>
                      <div>
                        <div className={'text-xs text-gray-500'}>Total pembayaran</div>
                        <p className={'font-semibold text-primary-dark'}>
                          {numberFormatHelper.toRupiah(item.total_payment)}
                        </p>
                      </div>
                    </div>
                    <div className={'pr-10'}>
                      <IconButton>
                        <MdInfo className={'text-primary-main'} />
                      </IconButton>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
