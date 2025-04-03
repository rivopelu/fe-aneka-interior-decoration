import { useEffect, useState } from "react"
import { ProductAction } from "../../redux/actions/product.action"
import { IProductReducers } from "../../redux/reducers/product.reducers"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { IResListProduct } from "../../types/response/IResListProduct"
import { IPaginatedChange } from "../../types/type/IPaginatedChange"

export function useAdminProductPage() {
  const dispatch = useAppDispatch()
  const productActions = new ProductAction()
  const Product: IProductReducers = useAppSelector(state => state.Product)
  const loading = Product.listProduct?.loading
  const paginatedData = Product?.listProduct?.paginated_data

  const [searchValue, setSearchValue] = useState<string>("")
  const [activeSearch, setActiveSearch] = useState<boolean>(false)

  const [listData, setListData] = useState<IResListProduct[]>([])
  const [page] = useState<number>(0)
  const [size] = useState<number>(10)


  function fetchData(page: number, size: number, name?: string) {
    let queryString = `?page=${page}&size=${size}`
    if (name) {
      queryString = queryString + `&name=${name}`
    }
    dispatch(productActions.listProduct(queryString))
  }
  useEffect(() => {
    fetchData(page, size)
  }, [])

  function onSearch(e: string) {
    fetchData(page, size, e)
    setActiveSearch(true)
  }

  function onResetSearch() {
    fetchData(page, size)
    setSearchValue("")
    setActiveSearch(false)
  }


  useEffect(() => {
    const data = Product.listProduct?.data
    if (!data) return
    setListData(data)
  }, [Product?.listProduct?.data])


  function onChangePage(e: IPaginatedChange) {
    fetchData(e.page, e.size)
  }

  return { listData, activeSearch, searchValue, setSearchValue, loading, paginatedData, onChangePage, onSearch, onResetSearch }
}