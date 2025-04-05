import { useAppDispatch, useAppSelector } from '../../../redux/store.ts';
import { OrderActions } from '../../../redux/actions/order.actions.ts';
import { useEffect } from 'react';
import { IPaginatedChange } from '../../../types/type/IPaginatedChange.ts';

export function useAdminOrderPage() {
  const dispatch = useAppDispatch();
  const orderAction = new OrderActions();
  const Order = useAppSelector((state) => state.Order);
  const dataList = Order.listOrderAdmin?.data || [];
  const loading = Order.listOrderAdmin?.loading;
  const paginatedData = Order.listOrderAdmin?.paginated_data;

  function fetchData(page: number, size: number, id?: string) {
    let queryString = `?page=${page}&size=${size}`;
    if (id) {
      queryString = queryString + `&id=${id}`;
    }
    dispatch(orderAction.getListOrderAdmin(queryString));
  }

  useEffect(() => {
    fetchData(0, 10);
  }, []);

  function onChangePage(e: IPaginatedChange) {
    fetchData(e.page, e.size);
  }
  return { dataList, loading, paginatedData, onChangePage };
}
