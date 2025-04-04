import { useAppDispatch, useAppSelector } from '../../../redux/store.ts';
import { AccountActions } from '../../../redux/actions/account.actions.ts';
import { useEffect } from 'react';

export function useAddressPage() {
  const dispatch = useAppDispatch();
  const accountActions = new AccountActions();
  const Account = useAppSelector((state) => state.Account);
  const datalist = Account?.listAddress?.data || [];
  const loading = Account?.listAddress?.loading;
  useEffect(() => {
    dispatch(accountActions.getListAddress());
  }, []);
  return { datalist, loading };
}
