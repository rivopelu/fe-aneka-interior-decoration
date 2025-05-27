import { useEffect, useState } from 'react';
import { ProductAction } from '../../../redux/actions/product.action';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { useFormik } from 'formik';
import { HttpService } from '../../../services/http.service';
import ErrorService from '../../../services/error.service';
import { ENDPOINT } from '../../../constants/endpoint';
import toast from 'react-hot-toast';
import { IResMasterData } from '../../../types/response/IResMasterData';

export function useAdminCategoryPage() {
  const productAction = new ProductAction();
  const dispatch = useAppDispatch();
  const Product = useAppSelector((state) => state.Product);

  const [showModalForm, setShowModalForm] = useState<boolean>(false);
  const [loadingForm, setLoadingForm] = useState<boolean>(false);

  const httpService = new HttpService();
  const errorService = new ErrorService();

  function fetchData() {
    dispatch(productAction.listCategory());
  }

  useEffect(() => {
    fetchData();
  }, []);

  const data = Product.listCategory?.data || [];

  const formik = useFormik({
    initialValues: {
      name: '',
      id: '',
    },
    onSubmit: (e) => onCreate(e),
  });

  function onCreate(data: any) {
    setLoadingForm(true);
    if (data.id) {
      httpService
        .PUT(ENDPOINT.EDIT_CATEGORY(), data)
        .then(() => {
          toast.success('Category Berhasil diupdate');
          onCloseModalForm();
          formik.resetForm();
          setLoadingForm(false);
          fetchData();
        })
        .catch((e) => {
          errorService.fetchApiError(e);
          setLoadingForm(false);
        });
    } else {
      httpService
        .POST(ENDPOINT.CREATE_CATEGORY(), data)
        .then(() => {
          toast.success('Category Berhasil dibuat');
          onCloseModalForm();
          formik.resetForm();
          setLoadingForm(false);
          fetchData();
        })
        .catch((e) => {
          errorService.fetchApiError(e);
          setLoadingForm(false);
        });
    }
  }

  function onCloseModalForm() {
    setShowModalForm(false);
    formik.resetForm();
  }

  function onClickEdit(e: IResMasterData) {
    formik.setValues({
      name: e.name,
      id: e.id,
    });
    setShowModalForm(true);
  }

  function onClickDeleteCategory(id: string) {
    httpService
      .DELETE(ENDPOINT.DELETE_CATEGORY(id))
      .then(() => {
        toast.success('Category Berhasil dihapus');
        onCloseModalForm();
        formik.resetForm();
        setLoadingForm(false);
        fetchData();
      })
      .catch((e) => {
        errorService.fetchApiError(e);
        setLoadingForm(false);
      });
  }

  return {
    data,
    onCloseModalForm,
    showModalForm,
    setShowModalForm,
    formik,
    loadingForm,
    onClickEdit,
    onClickDeleteCategory,
  };
}
