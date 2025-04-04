import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { useEffect } from 'react';
import { CartAction } from '../../redux/actions/cart.action.ts';

export function useCartPage() {
  const dispatch = useAppDispatch();
  const cartAction = new CartAction();
  const Cart = useAppSelector((state) => state.Cart);
  const countCart = Cart?.countCart?.data;
  const listCart = Cart?.listCart?.data || [];

  useEffect(() => {
    dispatch(cartAction.listCart());
  }, []);
  return { countCart, listCart };
}
