import { MdInfo } from "react-icons/md"
import IconButton from "../../components/IconButton"
import PageContainer from "../../components/PageContainer"
import Table from "../../components/Table"
import { NumberFormatterHelper } from "../../helper/number-format-helper"
import { IResListProduct } from "../../types/response/IResListProduct"
import { ITableColumn } from "../../types/type/ITableColumn"
import { useAdminProductPage } from "./useAdminProductPage"
import Pagination from "../../components/Pagination"
import DateHelper from "../../helper/date-helper"

export default function AdminProductPage() {
  const page = useAdminProductPage()
  const numberFormat = new NumberFormatterHelper()
  const dateHelper = new DateHelper()

  const column: ITableColumn<IResListProduct>[] = [
    {
      headerTitle: "Produk",
      component: (e) => (
        <div className="flex gap-3 max-w-xl">
          <img src={e.image} alt={e.name} className="object-cover h-20 aspect-square" />
          <div>
            <div>{e.name}</div>
            <div className="text-sm text-gray-500 line-clamp-2">{e.description}</div>
          </div>
        </div>
      )
    },
    {
      headerTitle: "Kategory",
      component: (e) => (
        <div >{e.category_name}</div>
      )
    },
    {
      headerTitle: "Tanggal Di Buat",
      component: (e) => (
        <div>{e.created_date ? dateHelper.toFormatDate(new Date(e.created_date), "dd LLLL, yyyy - HH:mm") : "-"}</div>
      )
    },
    {
      headerTitle: "Harga",
      component: (e) => (
        <div>{numberFormat.toRupiah(e.price)}</div>
      )
    },
    {
      component: () => (
        <div>
          <IconButton className="text-primary-main">
            <MdInfo />
          </IconButton>
        </div>
      )
    }
  ]

  return (
    <div className="mt-8">
      <PageContainer>
        <Table column={column} data={page.listData} loading={page.loading} />
        {
          page.paginatedData && <Pagination onPageChange={page.onChangePage} data={page.paginatedData} />
        }
      </PageContainer>
    </div>
  )
}