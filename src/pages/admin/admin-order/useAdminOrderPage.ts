import { useAppDispatch, useAppSelector } from '../../../redux/store.ts';
import { OrderActions } from '../../../redux/actions/order.actions.ts';
import { useEffect } from 'react';

export function useAdminOrderPage() {
  const dispatch = useAppDispatch();
  const orderAction = new OrderActions();
  const Order = useAppSelector((state) => state.Order);
  const dataList = Order.listOrderAdmin?.data || [];
  const loading = Order.listOrderAdmin?.loading;

  function fetchData() {
    dispatch(orderAction.getListOrderAdmin());
  }

  useEffect(() => {
    fetchData();
  }, []);
  return { dataList, loading };
}
