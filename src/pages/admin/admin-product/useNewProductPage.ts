import { useEffect, useState } from 'react';
import { ProductAction } from '../../../redux/actions/product.action';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { ILabelValue } from '../../../types/type/ILabelValue';
import { useFormik } from 'formik';
import { IReqCreateProduct } from '../../../types/request/IReqCreateProduct';
import * as Yup from 'yup';
import { HttpService } from '../../../services/http.service';
import ErrorService from '../../../services/error.service';
import { ENDPOINT } from '../../../constants/endpoint';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes';
export function useNewProductPage() {
  const dispatch = useAppDispatch();
  const productAction = new ProductAction();
  const Product = useAppSelector((state) => state.Product);
  const detail = Product?.detailProduct?.data;
  const loadingDetail = Product?.detailProduct?.loading;

  const httpService = new HttpService();
  const errorService = new ErrorService();
  const navigate = useNavigate();
  const { id } = useParams();

  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const [listCategory, setListCategory] = useState<ILabelValue<string>[]>([]);
  const initValue: IReqCreateProduct = {
    category_id: '',
    description: '',
    image_url: '',
    name: '',
    price: null,
  };

  const validationSchema = Yup.object({
    category_id: Yup.string().required('Category is required'),
    description: Yup.string().min(10, 'Description must be at least 10 characters'),
    image_url: Yup.string().url('Must be a valid URL').required('Image URL is required'),
    name: Yup.string().min(3, 'Product name must be at least 3 characters').required('Product name is required'),
    price: Yup.number()
      .typeError('Price must be a number')
      .positive('Price must be greater than 0')
      .required('Price is required'),
  });

  const formik = useFormik({
    initialValues: initValue,
    validationSchema: validationSchema,
    onSubmit: (e) => {
      setLoadingSubmit(true);
      httpService
        .POST(id ? ENDPOINT.EDIT_PRODUCT(id) : ENDPOINT.CREATE_PRODUCT(), e)
        .then(() => {
          setLoadingSubmit(false);
          if (id) {
            toast.success('Produk berhasil diedit');
          } else {
            toast.success('Produk berhasil dibuat');
          }
          navigate(ROUTES.ADMIN.PRODUCT());
        })
        .catch((e) => {
          errorService.fetchApiError(e);
          setLoadingSubmit(false);
        });
    },
  });

  useEffect(() => {
    dispatch(productAction.listCategory());
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(productAction.getAdminDetailProduct(id));
    }
  }, [id]);

  useEffect(() => {
    if (id && detail) {
      const data: IReqCreateProduct = {
        category_id: detail.category_id,
        price: detail.price,
        name: detail.name,
        description: detail.description || '',
        image_url: detail.image || '',
      };
      formik.setValues(data);
    } else {
      formik.setValues(initValue);
    }
  }, [id, detail]);

  useEffect(() => {
    const data = Product.listCategory?.data;
    if (!data) return;
    setListCategory(
      data.map((e) => {
        return {
          label: e.name,
          value: e.id,
        };
      }),
    );
  }, [Product.listCategory?.data]);

  return { listCategory, formik, loadingSubmit, loadingDetail };
}
