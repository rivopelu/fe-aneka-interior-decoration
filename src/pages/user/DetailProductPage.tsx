import { MdShoppingBasket } from "react-icons/md";
import Breadcrumbd from "../../components/Breadcrumbs";
import Button from "../../components/Button";
import { Card, CardBody } from "../../components/Card";
import Flex from "../../components/Flex";
import PageContainer from "../../components/PageContainer";
import { NumberFormatterHelper } from "../../helper/number-format-helper";
import { IBreadcrumbData } from "../../types/type/IBreadcrumbData";
import { useDetailProductPage } from "./useDetailProductPage";
import CardLoading from "../../components/CardLoading";

export default function detailProductPage() {
  const page = useDetailProductPage()
  const numberFormat = new NumberFormatterHelper()
  const breadcrumbData: IBreadcrumbData[] = [
    {
      label: "Beranda",
      path: "/"
    },
    {
      label: "Produk",
      path: "/"
    },
    {
      label: page.data?.category_name || "",
      path: "/"
    },
    {
      label: page.data?.name || "",
    }
  ]
  return (
    <div>
      <PageContainer>
        <div className="mt-10 grid gap-5">
          {
            page.loading ? <CardLoading /> :
              <>
                {
                  page.data && <Breadcrumbd breadCrumbData={breadcrumbData} />
                }
                {
                  page.data &&
                  <Card >
                    <CardBody>
                      <Flex gap="lg">
                        <img src={page?.data?.image} className="aspect-square  object-cover h-80" />
                        <div className="flex-1 grid gap-3">
                          <div className="text-2xl font-semibold">{page?.data?.name}</div>
                          <div className="text-4xl text-primary-main font-semibold">{numberFormat.toRupiah(page.data.price)}</div>
                          <p className="line-clamp-3 text-gray-600 text-sm">{page.data.description}</p>
                          <div className="mt-4">
                            <Button startIcon={<MdShoppingBasket />} className="rounded-none" variant="outlined">Tambahkan ke keranjang</Button>
                          </div>
                        </div>
                      </Flex>
                    </CardBody>
                  </Card>
                }
              </>
          }

        </div>
      </PageContainer>
    </div>
  )
}