import { useAppDispatch, useAppSelector } from '../../../redux/store.ts';
import { AccountActions } from '../../../redux/actions/account.actions.ts';
import { useEffect, useState } from 'react';
import { IPaginatedChange } from '../../../types/type/IPaginatedChange.ts';

export function useAdminAccountPage() {
  const dispatch = useAppDispatch();
  const accountAction = new AccountActions();
  const Account = useAppSelector((state) => state.Account);
  const dataList = Account?.listAccount?.data || [];
  const loading = Account?.listAccount?.loading;
  const paginatedData = Account?.listAccount?.paginated_data;

  const [page] = useState<number>(0);
  const [size] = useState<number>(10);

  useEffect(() => {
    fetchData(page, size);
  }, []);

  function onChangePage(e: IPaginatedChange) {
    fetchData(e.page, e.size);
  }

  function fetchData(page: number, size: number, name?: string) {
    let queryString = `?page=${page}&size=${size}`;
    if (name) {
      queryString = queryString + `&id=${name}`;
    }
    dispatch(accountAction.getListAccounts(queryString));
  }
  return { dataList, loading, paginatedData, onChangePage };
}
