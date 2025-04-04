import PageContainer from '../../components/PageContainer.tsx';
import { PageTitle } from '../../components/PageTItle.tsx';
import { useCartPage } from './useCartPage.ts';
import { Card, CardBody } from '../../components/Card.tsx';
import { NumberFormatterHelper } from '../../helper/number-format-helper.ts';
import QuantityButton from '../../components/QuantityButton.tsx';
import IconButton from '../../components/IconButton.tsx';
import { MdDelete } from 'react-icons/md';
import Button from '../../components/Button.tsx';

export default function CartPage() {
  const page = useCartPage();
  const numberFormat = new NumberFormatterHelper();
  return (
    <PageContainer className={'mt-8'}>
      <PageTitle title={`Keranjang (${page?.countCart || '0'} item)`} />
      <div className={'flex gap-2 relative'}>
        <div className={'flex-1 grid gap-2'}>
          {page.listCart.map((item) => (
            <Card className={''} key={item.cart_id}>
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
                      <Button variant={'outlined'} color={'error'} startIcon={<MdDelete />}>
                        Hapus
                      </Button>
                    </div>
                    <div className={'flex items-center gap-2'}>
                      <div className={'w-40'}>
                        <QuantityButton />
                      </div>
                      <div>{numberFormat.toRupiah(item.total_price)}</div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <Card className={'w-md h-fit'}>
          <CardBody>
            <h1>HELLO</h1>
          </CardBody>
        </Card>
      </div>
    </PageContainer>
  );
}
