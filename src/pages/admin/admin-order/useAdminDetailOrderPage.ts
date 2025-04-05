import { useAppDispatch, useAppSelector } from '../../../redux/store.ts';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { OrderActions } from '../../../redux/actions/order.actions.ts';

export function useAdminDetailOrderPage() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const orderAction = new OrderActions();
  const Order = useAppSelector((state) => state.Order);
  const data = Order?.detailOrder?.data;
  const loading = Order?.detailOrder?.loading;
  useEffect(() => {
    fetchData();
  }, []);
  function fetchData() {
    if (id) {
      dispatch(orderAction.getDetailOrder(id));
    }
  }
  return { data, loading };
}
