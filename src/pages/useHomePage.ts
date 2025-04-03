import { useEffect, useState } from "react"
import { IResListProduct } from "../types/response/IResListProduct"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { ProductAction } from "../redux/actions/product.action"
import { IProductReducers } from "../redux/reducers/product.reducers"

export function useHomePage() {
  const dispatch = useAppDispatch()
  const productActions = new ProductAction()
  const Product: IProductReducers = useAppSelector(state => state.Product)

  const [listData, setListData] = useState<IResListProduct[]>([])


  function fetchData() {
    dispatch(productActions.listProuct())
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (!Product?.listProduct?.data) return
    setListData(Product.listProduct.data)
  }, [Product?.listProduct?.data])

  return { listData }
}