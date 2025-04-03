import { useEffect, useState } from "react"
import { ProductAction } from "../../../redux/actions/product.action"
import { useAppDispatch, useAppSelector } from "../../../redux/store"
import { ILabelValue } from "../../../types/type/ILabelValue"
import { useFormik } from "formik"
import { IReqCreateProduct } from "../../../types/request/IReqCreateProduct"
import * as Yup from "yup"
import { HttpService } from "../../../services/http.service"
import ErrorService from "../../../services/error.service"
import { ENDPOINT } from "../../../constants/endpoint"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../../routes/routes"
export function useNewProductPage() {
  const dispatch = useAppDispatch()
  const productAction = new ProductAction()
  const Prodct = useAppSelector(state => state.Product)
  const httpService = new HttpService()
  const errorService = new ErrorService()
  const navigate = useNavigate()

  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)

  const [listCategory, setListCategory] = useState<ILabelValue<string>[]>([])
  const initValue: IReqCreateProduct = {
    category_id: "",
    description: "",
    image_url: "",
    name: "",
    price: null
  }

  const validationSchema = Yup.object({
    category_id: Yup.string().required("Category is required"),
    description: Yup.string().min(10, "Description must be at least 10 characters"),
    image_url: Yup.string().url("Must be a valid URL").required("Image URL is required"),
    name: Yup.string().min(3, "Product name must be at least 3 characters").required("Product name is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be greater than 0")
      .required("Price is required"),
  });

  const formik = useFormik({
    initialValues: initValue,
    validationSchema: validationSchema,
    onSubmit: (e) => {
      setLoadingSubmit(true)
      httpService.POST(ENDPOINT.CREATE_PRODUCT(), e).then(() => {
        setLoadingSubmit(false)
        toast.success("Produk berhasil dibuat")
        navigate(ROUTES.ADMIN.PRODUCT())
      }).catch(e => {
        errorService.fetchApiError(e)
        setLoadingSubmit(false)
      })
    }
  })

  useEffect(() => {
    dispatch(productAction.listCategory())
  }, [])

  useEffect(() => {
    const data = Prodct.listCategory?.data
    if (!data) return
    setListCategory(data.map((e) => {
      return {
        label: e.name,
        value: e.id
      }
    }))
  }, [Prodct.listCategory?.data])

  return { listCategory, formik, loadingSubmit }
}