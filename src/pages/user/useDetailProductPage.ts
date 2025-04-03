import { useEffect, useState } from "react"
import { ProductAction } from "../../redux/actions/product.action"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { useParams } from "react-router-dom"
import { IResListProduct } from "../../types/response/IResListProduct"

export function useDetailProductPage() {
  const dispatch = useAppDispatch()
  const productAction = new ProductAction()
  const Product = useAppSelector(state => state.Product)
  const data = Product.detailProduct?.data
  const loading = Product.detailProduct?.loading

  const [listProduct, setListProduct] = useState<IResListProduct[]>([])
  const [qty, setQty] = useState<number>(0)

  useEffect(() => {
    dispatch(productAction.listProduct())
  }, [])

  const { id } = useParams()
  useEffect(() => {
    if (!id) return
    dispatch(productAction.getDetailProduct(id))
  }, [])

  useEffect(() => {
    if (data) {
      if (!Product?.listProduct?.data) return
      const dataList = Product.listProduct.data.filter(e => e.id != data.id).splice(0, 5)
      setListProduct(dataList)
    }

  }, [data, Product?.listProduct])

  return { data, loading, qty, setQty, listProduct }
}