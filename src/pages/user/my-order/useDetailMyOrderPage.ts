import { useEffect } from "react"
import { OrderActions } from "../../../redux/actions/order.actions"
import { useAppDispatch, useAppSelector } from "../../../redux/store"
import { useParams } from "react-router-dom"

export function useDetailMyOrderPage() {
  const dispatch = useAppDispatch()
  const orderAction = new OrderActions()
  const { id } = useParams()
  const Order = useAppSelector(state => state.Order)
  const data = Order?.detailOrder?.data
  const loading = Order?.detailOrder?.loading


  useEffect(() => {
    if (id) {
      dispatch(orderAction.getDetailOrder(id))
    }
  }, [])
  return { data, loading }
}

