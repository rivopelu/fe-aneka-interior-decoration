import { useEffect, useState } from "react"
import { OrderActions } from "../../../redux/actions/order.actions"
import { useAppDispatch, useAppSelector } from "../../../redux/store"
import { useParams } from "react-router-dom"
import { HttpService } from "../../../services/http.service"
import ErrorService from "../../../services/error.service"
import { ENDPOINT } from "../../../constants/endpoint"

export function useDetailMyOrderPage() {
  const dispatch = useAppDispatch()
  const httpService = new HttpService
  const errorService = new ErrorService()
  const orderAction = new OrderActions()
  const { id } = useParams()
  const Order = useAppSelector(state => state.Order)
  const data = Order?.detailOrder?.data
  const loading = Order?.detailOrder?.loading

  const [uploadPaymentImageUrl, setUploadPaymentImageUrl] = useState<string | undefined>()
  const [loadingSubmitImage, setLoadingSubmitImage] = useState<boolean>(false);

  useEffect(() => {
    fetchData()
  }, [])

  function fetchData() {
    if (id) {
      dispatch(orderAction.getDetailOrder(id))
    }
  }

  function onSubmitPayment() {
    if (uploadPaymentImageUrl && id) {
      setLoadingSubmitImage(true)
      httpService.PUT(ENDPOINT.UPLOAD_PAYMENT_IMAGE(id), { url: uploadPaymentImageUrl }).then(() => {
        fetchData()
        setLoadingSubmitImage(false)
      }).catch(e => {
        errorService.fetchApiError(e)
        setLoadingSubmitImage(false)
      })
    }

  }
  return { data, loading, uploadPaymentImageUrl, setUploadPaymentImageUrl, onSubmitPayment, loadingSubmitImage }
}

