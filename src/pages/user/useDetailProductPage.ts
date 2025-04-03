import { useEffect, useState } from "react"
import { ProductAction } from "../../redux/actions/product.action"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { useParams } from "react-router-dom"

export function useDetailProductPage() {
  const dispatch = useAppDispatch()
  const productAction = new ProductAction()
  const Product = useAppSelector(state => state.Product)
  const data = Product.detailProduct?.data
  const loading = Product.detailProduct?.loading

  const [qty, setQty] = useState<number>(0)

  const { id } = useParams()
  useEffect(() => {
    if (!id) return
    dispatch(productAction.getDetailProduct(id))
  }, [])

  return { data, loading, qty, setQty, }
}