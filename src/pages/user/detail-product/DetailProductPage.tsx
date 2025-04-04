import { MdShoppingBasket } from 'react-icons/md';
import Breadcrumbd from '../../../components/Breadcrumbs.tsx';
import Button from '../../../components/Button.tsx';
import { Card, CardBody } from '../../../components/Card.tsx';
import Flex from '../../../components/Flex.tsx';
import PageContainer from '../../../components/PageContainer.tsx';
import { NumberFormatterHelper } from '../../../helper/number-format-helper.ts';
import { IBreadcrumbData } from '../../../types/type/IBreadcrumbData.ts';
import { useDetailProductPage } from './useDetailProductPage.ts';
import CardLoading from '../../../components/CardLoading.tsx';
import ProductCard from '../../../components/ProductCard.tsx';
import Grid from '../../../components/Grid.tsx';
import QuantityButton from '../../../components/QuantityButton.tsx';

export default function detailProductPage() {
  const page = useDetailProductPage();
  const numberFormat = new NumberFormatterHelper();
  const breadcrumbData: IBreadcrumbData[] = [
    {
      label: 'Beranda',
      path: '/',
    },
    {
      label: 'Produk',
      path: '/',
    },
    {
      label: page.data?.category_name || '',
      path: '/',
    },
    {
      label: page.data?.name || '',
    },
  ];

  return (
    <div>
      <PageContainer>
        <div className="mt-10 grid gap-5">
          {page.loading ? (
            <CardLoading />
          ) : (
            <>
              {page.data && <Breadcrumbd breadCrumbData={breadcrumbData} />}
              {page.data && (
                <Card>
                  <CardBody>
                    <Flex gap="lg">
                      <img alt={'product'} src={page?.data?.image} className="aspect-square  object-cover h-80" />
                      <div className="flex-1 grid gap-5">
                        <div className="text-2xl font-semibold">{page?.data?.name}</div>
                        <div className="text-4xl text-primary-main font-semibold">
                          {numberFormat.toRupiah(page.data.price)}
                        </div>
                        <p className="line-clamp-3 text-gray-600 text-sm">{page.data.description}</p>
                        <div className="grid grid-cols-2 w-sm">
                          <div className="h-full flex items-center text-gray-400">
                            <div>Kuantitas</div>
                          </div>
                          <QuantityButton
                            onAddQty={() => page.setQty((e) => e + 1)}
                            onReduceQty={() => page.setQty((e) => e - 1)}
                            quantity={page.qty}
                          />
                        </div>
                        <div>
                          <Button
                            loading={page.loadingAdd}
                            onClick={page.onAddToCart}
                            disable={page.qty === 0}
                            startIcon={<MdShoppingBasket />}
                            className="rounded-none"
                            variant="outlined"
                          >
                            Tambahkan ke keranjang
                          </Button>
                        </div>
                      </div>
                    </Flex>
                  </CardBody>
                </Card>
              )}
              {page.listProduct.length > 0 && (
                <>
                  <h1 className="text-2xl text-gray-600">Produk Lainnya</h1>
                  <Grid grid={5} gap="sm">
                    {page.listProduct.map((item, i) => (
                      <ProductCard key={i} data={item} />
                    ))}
                  </Grid>
                </>
              )}
            </>
          )}
        </div>
      </PageContainer>
    </div>
  );
}
