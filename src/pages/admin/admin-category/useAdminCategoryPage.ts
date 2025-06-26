import { useEffect, useState } from 'react';
import { ProductAction } from '../../../redux/actions/product.action';
import { CategoryAction } from '../../../redux/actions/category.action';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { useFormik } from 'formik';
import { HttpService } from '../../../services/http.service';
import ErrorService from '../../../services/error.service';
import { ENDPOINT } from '../../../constants/endpoint';
import toast from 'react-hot-toast';
import { IResMasterData } from '../../../types/response/IResMasterData';
import { IReqCreateSubCategory } from '../../../types/request/IReqCreateSubCategory';
import { ILabelValue } from '../../../types/type/ILabelValue';

export function useAdminCategoryPage() {
  const productAction = new ProductAction();
  const categoryAction = new CategoryAction();
  const dispatch = useAppDispatch();
  const Product = useAppSelector((state) => state.Product);

  const [showModalForm, setShowModalForm] = useState<boolean>(false);
  const [loadingForm, setLoadingForm] = useState<boolean>(false);

  // Sub-category states
  const [showSubCategoryModal, setShowSubCategoryModal] = useState<boolean>(false);
  const [loadingSubCategoryForm, setLoadingSubCategoryForm] = useState<boolean>(false);
  const [categoryOptions, setCategoryOptions] = useState<ILabelValue<string>[]>([]);

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

  // Sub-category formik
  const subCategoryFormik = useFormik<IReqCreateSubCategory>({
    initialValues: {
      name: '',
      category_id: '',
    },
    onSubmit: (values) => onCreateSubCategory(values),
  });

  // Update category options when data changes
  useEffect(() => {
    if (data.length > 0) {
      const options: ILabelValue<string>[] = data.map((category) => ({
        label: category.name,
        value: category.id,
      }));
      setCategoryOptions(options);
    }
  }, [data]);

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

  // Sub-category functions
  function onCreateSubCategory(data: IReqCreateSubCategory) {
    setLoadingSubCategoryForm(true);
    categoryAction
      .createSubCategory(data)
      .then(() => {
        toast.success('Sub-Category berhasil dibuat');
        onCloseSubCategoryModal();
        subCategoryFormik.resetForm();
        setLoadingSubCategoryForm(false);
        fetchData(); // Refresh the category list
      })
      .catch((e) => {
        errorService.fetchApiError(e);
        setLoadingSubCategoryForm(false);
      });
  }

  function onCloseSubCategoryModal() {
    setShowSubCategoryModal(false);
    subCategoryFormik.resetForm();
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
    // Sub-category functionality
    showSubCategoryModal,
    setShowSubCategoryModal,
    subCategoryFormik,
    loadingSubCategoryForm,
    onCloseSubCategoryModal,
    categoryOptions,
  };
}
