import { useEffect, useState } from "react"
import { ProductAction } from "../redux/actions/product.action"
import { IProductReducers } from "../redux/reducers/product.reducers"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { IResListProduct } from "../types/response/IResListProduct"

export function useHomePage() {
  const dispatch = useAppDispatch()
  const productActions = new ProductAction()
  const Product: IProductReducers = useAppSelector(state => state.Product)
  const loading = Product.listProduct?.loading

  const [listData, setListData] = useState<IResListProduct[]>([])
  const [page, setPage] = useState<number>(1)
  const [size] = useState<number>(10)



  function fetchData(page: number, size: number) {
    const queryString = `?page=${page}&size=${size}`
    dispatch(productActions.listProduct(queryString))
  }



  useEffect(() => {
    const data = Product.listProduct?.data
    if (!data) return

    setListData((prevListData) => {
      const newList = [...prevListData]

      data.forEach(item => {
        if (!newList.some(existingItem => existingItem.id === item.id)) {
          newList.push(item)
        }
      })

      return newList
    })
  }, [Product?.listProduct?.data])

  useEffect(() => {
    fetchData(page, size)
  }, [])

  function loadMore() {
    const nextPage = page + 1
    setPage(nextPage)
    fetchData(nextPage, size)
  }

  return { listData, loadMore, loading }
}