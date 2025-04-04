import { IReqCreateShippingAddress } from '../../../types/request/IReqCreateShippingAddress.ts';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { HttpService } from '../../../services/http.service.ts';
import ErrorService from '../../../services/error.service.ts';
import { ENDPOINT } from '../../../constants/endpoint.ts';
import { BaseResponse } from '../../../types/response/IResModel.ts';
import { IResGetDestination } from '../../../types/request/IResGetDestination.ts';
import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes.ts';

export function useNewAddressPage() {
  const httpService = new HttpService();
  const errorService = new ErrorService();
  const navigate = useNavigate();

  const [listDestination, setListDestination] = useState<IResGetDestination[]>([]);
  const [loadingCity, setLoadingCity] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const initValue: IReqCreateShippingAddress = {
    address: '',
    province: '',
    subdistrict: '',
    destination_code: '',
    city: '',
    city_query: '',
  };

  const validationSchema = Yup.object().shape({
    address: Yup.string().required('Alamat wajib diisi'),
    province: Yup.string().required('Provinsi wajib diisi'),
    subdistrict: Yup.string().required('Kecamatan wajib diisi'),
    destination_code: Yup.string().required('Kode tujuan wajib diisi'),
    city: Yup.string().required('Kota wajib diisi'),
    city_query: Yup.string().required('Query kota wajib diisi'),
  });

  const formik = useFormik({
    initialValues: initValue,
    validationSchema: validationSchema,
    onSubmit: (e) => {
      setLoadingSubmit(true);
      httpService
        .POST(ENDPOINT.CREATE_SHIPPING_ADDRESS(), e)
        .then(() => {
          toast.success('Alamat berhasil dibuat');
          setLoadingSubmit(false);
          navigate(ROUTES.ADDRESS());
        })
        .catch((e) => {
          errorService.fetchApiError(e);
          setLoadingSubmit(false);
        });
    },
  });

  function fetchQuery(q: string) {
    setLoadingCity(true);
    httpService
      .GET(ENDPOINT.GET_DESTINATION(q))
      .then((res: BaseResponse<IResGetDestination[]>) => {
        setLoadingCity(false);
        setListDestination(res.data.response_data);
      })
      .catch((e) => {
        setLoadingCity(false);
        errorService.fetchApiError(e);
      });
  }

  useEffect(() => {
    if (!formik.values.city_query) return;

    const debouncedFetch = debounce((query: string) => {
      fetchQuery(query);
    }, 500);

    debouncedFetch(formik.values.city_query);

    return () => {
      debouncedFetch.cancel();
    };
  }, [formik.values.city_query]);

  function selectedDestination(e: IResGetDestination) {
    const data: IReqCreateShippingAddress = {
      ...formik.values,
      ...e,
      city_query: `${e.province}, ${e.city}, ${e.subdistrict}`,
    };
    formik.setValues(data);
  }

  return { formik, loadingCity, listDestination, selectedDestination, loadingSubmit };
}
