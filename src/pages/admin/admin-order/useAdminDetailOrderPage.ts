import { useAppDispatch, useAppSelector } from '../../../redux/store.ts';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { OrderActions } from '../../../redux/actions/order.actions.ts';
import { IReqApproveRejectOrder } from '../../../types/request/IReqApproveRejectOrder.ts';
import { APPROVE_REJECT_ENUM } from '../../../enums/approve-reject-enum.ts';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { HttpService } from '../../../services/http.service.ts';
import ErrorService from '../../../services/error.service.ts';
import { ENDPOINT } from '../../../constants/endpoint.ts';
import toast from 'react-hot-toast';
import { IReqInputResi } from '../../../types/request/IReqInputResi.ts';

export function useAdminDetailOrderPage() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const orderAction = new OrderActions();
  const Order = useAppSelector((state) => state.Order);
  const httpService = new HttpService();
  const errorService = new ErrorService();
  const data = Order?.detailOrder?.data;
  const loading = Order?.detailOrder?.loading;
  const initValueReject: IReqApproveRejectOrder = {
    reason: '',
    type: APPROVE_REJECT_ENUM.REJECT,
  };

  const [showModalReject, setShowModalReject] = useState(false);
  const [loadingApproveReject, setLoadingApproveReject] = useState(false);
  const [showModalResi, setShowModalResi] = useState(false);
  const [loadingInputResi, setLoadingInputResi] = useState(false);

  const validationSchema = Yup.object().shape({
    reason: Yup.string().required('Required'),
  });

  const initStateResi: IReqInputResi = {
    resi: '',
  };

  const formikResi = useFormik({
    initialValues: initStateResi,
    onSubmit: (e) => {
      if (id) {
        setLoadingInputResi(true);
        httpService
          .PUT(ENDPOINT.INPUT_RESI(id), e)
          .then(() => {
            setLoadingInputResi(false);
            setShowModalResi(false);
            formikResi.setValues(initStateResi);
            toast.success('Resi pengiriman berhasil dikirm');
            fetchData();
          })
          .catch((e) => {
            setLoadingInputResi(false);
            errorService.fetchApiError(e);
          });
      }
    },
  });

  const formikReject = useFormik({
    initialValues: initValueReject,
    validationSchema: validationSchema,
    onSubmit: (e) => {
      onSubmitApproveReject(e);
    },
  });
  useEffect(() => {
    fetchData();
  }, []);
  function fetchData() {
    if (id) {
      dispatch(orderAction.getDetailOrder(id));
    }
  }

  function onCloseModalReject() {
    setShowModalReject(false);
    formikReject.setFieldValue('reason', '');
  }

  function onSubmitApproveReject(data: IReqApproveRejectOrder) {
    if (id) {
      setLoadingApproveReject(true);
      httpService
        .PUT(ENDPOINT.APPROVE_REJECT_ORDER(id), data)
        .then(() => {
          if (data.type === APPROVE_REJECT_ENUM.REJECT) {
            toast.success('Pesanan berhasil ditolak');
          } else if (data.type === APPROVE_REJECT_ENUM.APPROVE) {
            toast.success('Pesanan berhasil diterima');
          }
          setLoadingApproveReject(false);
          setShowModalReject(false);
          fetchData();
        })
        .catch((e) => {
          setLoadingApproveReject(false);
          errorService.fetchApiError(e);
        });
    }
  }

  function onApproveOrder() {
    const data: IReqApproveRejectOrder = {
      reason: '',
      type: APPROVE_REJECT_ENUM.APPROVE,
    };

    onSubmitApproveReject(data);
  }

  return {
    data,
    formikReject,
    loading,
    setShowModalReject,
    showModalReject,
    onCloseModalReject,
    loadingApproveReject,
    onApproveOrder,
    formikResi,
    showModalResi,
    setShowModalResi,
    loadingInputResi,
  };
}
