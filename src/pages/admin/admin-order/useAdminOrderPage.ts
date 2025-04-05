import { useAppDispatch, useAppSelector } from '../../../redux/store.ts';
import { OrderActions } from '../../../redux/actions/order.actions.ts';
import { useEffect, useState } from 'react';
import { IPaginatedChange } from '../../../types/type/IPaginatedChange.ts';

export function useAdminOrderPage() {
  const dispatch = useAppDispatch();
  const orderAction = new OrderActions();
  const Order = useAppSelector((state) => state.Order);
  const dataList = Order.listOrderAdmin?.data || [];
  const loading = Order.listOrderAdmin?.loading;
  const paginatedData = Order.listOrderAdmin?.paginated_data;

  const [searchValue, setSearchValue] = useState<string>('');
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const [page] = useState<number>(0);
  const [size] = useState<number>(10);

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
  function onSearch(e: string) {
    fetchData(page, size, e);
    setActiveSearch(true);
  }

  function onResetSearch() {
    fetchData(page, size);
    setSearchValue('');
    setActiveSearch(false);
  }

  return {
    dataList,
    loading,
    paginatedData,
    onChangePage,
    searchValue,
    setSearchValue,
    activeSearch,
    setActiveSearch,
    onSearch,
    onResetSearch,
  };
}
